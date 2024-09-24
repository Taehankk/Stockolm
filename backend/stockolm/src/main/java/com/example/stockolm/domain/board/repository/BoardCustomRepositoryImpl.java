package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

public class BoardCustomRepositoryImpl implements BoardCustomRepository {

    private final JPAQueryFactory queryFactory;

    public BoardCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<String> findImagePathById(Long boardId) {
        QBoardImage boardImage = QBoardImage.boardImage;

        return queryFactory
                .select(boardImage.imagePath)
                .from(boardImage)
                .where(boardImage.board.boardId.eq(boardId))
                .fetch();
    }

    @Override
    public boolean isLike(Long boardId, Long userId) {
        QBoardLike boardLike = QBoardLike.boardLike;

        return queryFactory
                .selectFrom(boardLike)
                .where(boardLike.user.userId.eq(userId)
                        .and(boardLike.board.boardId.eq(boardId)))
                .fetchFirst() != null;
    }

    @Override
    public List<Comment> findCommentById(Long boardId) {
        QComment comment = QComment.comment;

        return queryFactory
                .selectFrom(comment)
                .where(comment.board.boardId.eq(boardId))
                .orderBy(comment.createAt.asc())
                .fetch();
    }
}
