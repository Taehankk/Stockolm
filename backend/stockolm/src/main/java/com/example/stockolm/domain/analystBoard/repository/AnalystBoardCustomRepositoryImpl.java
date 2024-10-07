package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardPageResponse;
import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoardLike;
import com.example.stockolm.domain.stock.dto.response.BestAnalystResponse;
import com.example.stockolm.domain.stock.entity.QStock;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;


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
                .select(Projections.constructor(
                        BestAnalystResponse.class,
                        analystBoard.analystBoardId,
                        analystBoard.goalDate,
                        analystBoard.opinion,
                        analystBoard.goalStock,
                        analystInfo.reliability,
                        analystInfo.accuracy,
                        user.userName,
                        user.userImagePath,
                        user.userNickname
                ))
                .from(analystBoard)
                .join(analystInfo).on(analystBoard.user.userId.eq(analystInfo.user.userId))
                .join(user).on(analystBoard.user.userId.eq(user.userId))
                .where(analystBoard.stock.stockId.eq(stockId))
                .orderBy(analystInfo.reliability.desc())
                .limit(5)
                .fetch();
    }

    @Override
    public Page<AnalystBoardPageResponse> getAnalystBoardPage(String searchWord, Pageable pageable, Long userId, String searchAnalyst) {
        QStock stock = QStock.stock;
        QUser user = QUser.user;
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QAnalystBoardLike analystBoardLike = QAnalystBoardLike.analystBoardLike;

        // 검색어 조건 처리
        BooleanBuilder builder = new BooleanBuilder();
        if(searchWord != null && !searchWord.isEmpty()) {
            builder.and(analystBoard.title.contains(searchWord).or(analystBoard.content.contains(searchWord)).or(stock.stockName.contains(searchWord)));
        }

        // 애널리스트 검색 조건 처리
        if(searchAnalyst != null && !searchAnalyst.isEmpty()) {
            builder.and(analystBoard.user.userNickname.eq(searchAnalyst));
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

        List<AnalystBoardPageResponse> analystBoardPage = queryFactory
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
                        likeExpression != null ? likeExpression : Expressions.asBoolean(false)  // 좋아요 여부
                ))
                .from(analystBoard)
                .join(analystBoard.user, user)
                .join(analystBoard.stock, stock)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 정렬 조건 처리
        Map<String, Function<AnalystBoardPageResponse, Comparable>> sortMap = Map.of(
                "latest", AnalystBoardPageResponse::getCreateAt,
                "like", AnalystBoardPageResponse::getLikeCnt,
                "view", AnalystBoardPageResponse::getViewCnt
        );
        Comparator<AnalystBoardPageResponse> comparator = Comparator.comparing(
                sortMap.getOrDefault(pageable.getSort().isSorted() ? pageable.getSort().iterator().next().getProperty() : "",
                        AnalystBoardPageResponse::getCreateAt) // 기본값은 최신순 정렬
        );
        analystBoardPage.sort(comparator.reversed()); // 항상 내림차순 정렬

        Long total = queryFactory
                .select(analystBoard.count())
                .from(analystBoard)
                .where(builder)
                .fetchOne();

        return new PageImpl<>(analystBoardPage, pageable, total);
    }

}
