package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;

import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;

import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;


>>>>>>> backend/stockolm/src/main/java/com/example/stockolm/domain/analystBoard/repository/AnalystBoardCustomRepositoryImpl.java
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoardLike;
import com.example.stockolm.domain.board.entity.QBoardLike;
import com.example.stockolm.domain.stock.dto.response.BestAnalystResponse;
import com.example.stockolm.domain.stock.dto.response.HotStock;
import com.example.stockolm.domain.stock.entity.QStock;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;


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
                        user.userImagePath
                ))
                .from(analystBoard)
                .join(analystInfo).on(analystBoard.user.userId.eq(analystInfo.user.userId))
                .join(user).on(analystBoard.user.userId.eq(user.userId))
                .where(analystBoard.stock.stockId.eq(stockId))
                .orderBy(analystInfo.reliability.desc())
                .limit(5)
                .fetch();
    }


}
