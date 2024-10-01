package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoardLike;
import com.example.stockolm.domain.board.entity.QBoardLike;
import com.example.stockolm.domain.stock.entity.QStock;
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

}
