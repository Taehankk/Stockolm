package com.example.stockolm.domain.comment.repository;

import com.example.stockolm.domain.comment.entity.QComment;
import com.example.stockolm.domain.comment.dto.response.CommentResponse;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

public class CommentCustomRepositoryImpl implements CommentCustomRepository {

    private final JPAQueryFactory queryFactory;

    public CommentCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<CommentResponse> findByBoardId(Long boardId) {
        QUser user = QUser.user;
        QComment comment = QComment.comment;

        return queryFactory
                .select(Projections.constructor(CommentResponse.class,
                        comment.commentId,
                        comment.user.userId,
                        comment.user.userImagePath,
                        comment.user.userNickname,
                        comment.content,
                        comment.createAt,
                        comment.updateAt
                ))
                .from(comment)
                .join(comment.user, user)
                .where(comment.board.boardId.eq(boardId))
                .orderBy(comment.createAt.asc()) // 오름차순 정렬 - 최신 댓글이 가장 아래에 보이도록
                .fetch();
    }
}
