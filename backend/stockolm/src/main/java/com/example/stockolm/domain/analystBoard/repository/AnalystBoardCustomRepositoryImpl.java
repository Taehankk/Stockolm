package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardPageResponse;
import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoardLike;
import com.example.stockolm.domain.stock.dto.response.BestAnalystResponse;
import com.example.stockolm.domain.stock.entity.QStock;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static com.example.stockolm.domain.analyst.entity.QAnalystInfo.analystInfo;
import static com.example.stockolm.domain.analystBoard.entity.QAnalystBoard.analystBoard;
import static com.example.stockolm.domain.user.entity.QUser.user;


public class AnalystBoardCustomRepositoryImpl implements AnalystBoardCustomRepository {

    private final JPAQueryFactory queryFactory;

    public AnalystBoardCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<LikedAnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QAnalystBoardLike analystBoardLike = QAnalystBoardLike.analystBoardLike;
        QStock stock = QStock.stock;

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(analystBoardLike.user.userId.eq(userId));

        if (stockName != null && !stockName.isEmpty()) {
            builder.and(stock.stockName.contains(stockName));
        }

        return queryFactory
                .select(Projections.constructor(LikedAnalystBoardResponse.class,
                        analystBoard.analystBoardId, analystBoard.stock.stockName,
                        analystBoard.title, analystBoard.user.userName,
                        analystBoard.user.userNickname, analystBoard.filePath))
                .from(analystBoard)
                .join(analystBoardLike).on(analystBoard.analystBoardId.eq(analystBoardLike.analystBoard.analystBoardId))
                .join(stock).on(analystBoard.stock.stockId.eq(stock.stockId)).fetchJoin()
                .where(builder)
                .fetch();
    }

    @Override
    public void choseMainContent(Long userId, Long analystBoardId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;

        queryFactory
                .update(analystBoard)
                .set(analystBoard.mainContent, false)
                .where(analystBoard.mainContent.eq(true)
                        .and(analystBoard.user.userId.eq(userId)))
                .execute();

        queryFactory
                .update(analystBoard)
                .set(analystBoard.mainContent, true)
                .where(analystBoard.analystBoardId.eq(analystBoardId)
                        .and(analystBoard.user.userId.eq(userId)))
                .execute();

    }

    @Override
    public boolean isLike(Long analystBoardId, Long userId) {
        QAnalystBoardLike analystBoardLike = QAnalystBoardLike.analystBoardLike;

        return queryFactory
                .selectFrom(analystBoardLike)
                .where(analystBoardLike.user.userId.eq(userId)
                        .and(analystBoardLike.analystBoard.analystBoardId.eq(analystBoardId)))
                .fetchFirst() != null;
    }

    public List<BestAnalystResponse> findBestAnalystByStockId(Long stockId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QAnalystInfo analystInfo = QAnalystInfo.analystInfo;
        QUser user = QUser.user;

        return queryFactory
                .select(Projections.constructor(BestAnalystResponse.class,
                        analystBoard.analystBoardId,
                        analystBoard.goalDate,
                        analystBoard.opinion,
                        analystBoard.goalStock,
                        getStockReliabilityPercent(analystBoard),
                        getStockAccuracyPercent(analystBoard),
                        user.userName,
                        user.userImagePath,
                        user.userNickname
                ))
                .from(analystBoard)
                .join(analystInfo).on(analystBoard.user.userId.eq(analystInfo.user.userId))
                .join(user).on(analystBoard.user.userId.eq(user.userId))
                .where(analystBoard.stock.stockId.eq(stockId))
                .groupBy(analystBoard.analystBoardId, user.userName,
                        analystInfo.reliability, analystInfo.accuracy,
                        analystInfo.totalAnalystScore)
                .orderBy(getStockReliabilityPercent(analystBoard).desc(), analystInfo.totalAnalystScore.desc())
                .limit(15)
                .fetch();
    }



    private NumberExpression<Long> getStockReliabilityPercent(QAnalystBoard analystBoard) {
        return getReliabilitySum(analystBoard)
                .divide(getReliabilitySum(analystBoard)).multiply(100).coalesce(0L);
    }

    private NumberExpression<Long> getReliabilitySum(QAnalystBoard analystBoard) {
        return new CaseBuilder()
                .when(analystBoard.goalDate.lt(LocalDate.now()).and(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)))
                .then(1L).otherwise(0L).sum();
    }

    private NumberExpression<Long> getStockAccuracyPercent(QAnalystBoard analystBoard) {
        return getAccuracySum(analystBoard)
                .divide(getAccuracySum(analystBoard)).multiply(100).coalesce(0L);
    }

    private NumberExpression<Long> getAccuracySum(QAnalystBoard analystBoard) {
        return new CaseBuilder()
                .when(analystBoard.goalDate.lt(LocalDate.now()).and(analystBoard.goalAccuracy.eq(GoalCategory.SUCCESS)))
                .then(1L).otherwise(0L).sum();
    }
    

    @Override
    public Page<AnalystBoardPageResponse> getAnalystBoardPage(String searchWord, Pageable pageable, Long userId, String searchAnalyst, String stockName) {
        QStock stock = QStock.stock;
        QUser user = QUser.user;
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QAnalystBoardLike analystBoardLike = QAnalystBoardLike.analystBoardLike;

        // 검색어 조건 처리
        BooleanBuilder builder = new BooleanBuilder();
        if (searchWord != null && !searchWord.isEmpty()) {
            builder.and(analystBoard.title.contains(searchWord).or(analystBoard.content.contains(searchWord)).or(stock.stockName.contains(searchWord)));
        }

        // 애널리스트 검색 조건 처리
        if (searchAnalyst != null && !searchAnalyst.isEmpty()) {
            builder.and(analystBoard.user.userNickname.eq(searchAnalyst));
        }

        // 종목별로 모아보기 조건 처리
        if (stockName != null && !stockName.isEmpty()) {
            builder.and(analystBoard.stock.stockName.eq(stockName));
        }

        // 로그인 유저인 경우만 좋아요 여부를 판단
        BooleanExpression likeExpression = null;
        if (userId != null) {
            likeExpression = JPAExpressions.selectOne()
                    .from(analystBoardLike)
                    .where(analystBoardLike.analystBoard.analystBoardId.eq(analystBoard.analystBoardId)
                            .and(analystBoardLike.user.userId.eq(userId)))
                    .exists();
        }

        JPQLQuery<AnalystBoardPageResponse> query = queryFactory
                .select(Projections.constructor(AnalystBoardPageResponse.class,
                        user.userName,
                        user.userNickname,
                        user.userImagePath,
                        stock.stockName,
                        stock.companyImagePath,
                        analystBoard.analystBoardId,
                        analystBoard.mainContent,
                        analystBoard.title,
                        analystBoard.likeCnt,
                        analystBoard.viewCnt,
                        analystBoard.createAt,
                        analystBoard.updateAt,
                        likeExpression != null ? likeExpression : Expressions.asBoolean(false),  // 좋아요 여부
                        analystBoard.filePath
                ))
                .from(analystBoard)
                .join(analystBoard.user, user)
                .join(analystBoard.stock, stock)
                .where(builder);

        // 특정 애널리스트가 작성한 글만 조회하는 경우, 대표글을 먼저 보여주기
        if (searchAnalyst != null && !searchAnalyst.isEmpty()) {
            query.orderBy(analystBoard.mainContent.desc());
        }

        // 정렬 조건 적용 (항상 내림차순)
        String sortProperty = pageable.getSort().isSorted()
                ? pageable.getSort().iterator().next().getProperty()
                : "latest"; // 기본값은 최신순 정렬

        switch (sortProperty) {
            case "like":
                query.orderBy(analystBoard.likeCnt.desc());
                break;
            case "view":
                query.orderBy(analystBoard.viewCnt.desc());
                break;
            default:
                query.orderBy(analystBoard.createAt.desc());
        }

        List<AnalystBoardPageResponse> analystBoardPage = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(analystBoard.count())
                .from(analystBoard)
                .where(builder)
                .fetchOne();

        return new PageImpl<>(analystBoardPage, pageable, total);
    }

}
