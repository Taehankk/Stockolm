package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.dto.response.BoardPageResponse;
import com.example.stockolm.domain.board.dto.response.BoardResponse;
import com.example.stockolm.domain.board.entity.*;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class BoardCustomRepositoryImpl implements BoardCustomRepository {

    private final JPAQueryFactory queryFactory;

    public BoardCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<BoardPageResponse> getBoardPage(String searchWord, Pageable pageable, Long userId) {
        QUser user = QUser.user;
        QBoard board = QBoard.board;
        QComment comment = QComment.comment;
        QBoardLike boardLike = QBoardLike.boardLike;

        // 검색어 조건 처리
        BooleanBuilder builder = new BooleanBuilder();
        if(searchWord != null && !searchWord.isEmpty()) {
            builder.and(board.title.contains(searchWord).or(board.content.contains(searchWord)));
        }

        List<BoardPageResponse> boardPage = queryFactory
                .select(Projections.constructor(BoardPageResponse.class,
                        user.userNickname,
                        user.userImagePath,
                        board.boardId,
                        board.title,
                        board.category.stringValue(),
                        board.viewCnt,
                        board.likeCnt,
                        JPAExpressions.select(comment.count().intValue()) // 댓글 개수
                                .from(comment)
                                .where(comment.board.boardId.eq(board.boardId)),
                        board.createAt,
                        board.updateAt,
                        JPAExpressions.selectOne() // 좋아요 여부
                                .from(boardLike)
                                .where(boardLike.board.boardId.eq(board.boardId)
                                        .and(boardLike.user.userId.eq(userId)))
                                .exists()
                ))
                .from(board)
                .join(board.user, user)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 정렬 조건 처리
        Map<String, Function<BoardPageResponse, Comparable>> sortMap = Map.of(
                "like", BoardPageResponse::getLikeCnt,
                "view", BoardPageResponse::getViewCnt,
                "comment", BoardPageResponse::getCommentCnt
        );
        Comparator<BoardPageResponse> comparator = Comparator.comparing(
                sortMap.getOrDefault(pageable.getSort().isSorted() ? pageable.getSort().iterator().next().getProperty() : "",
                        BoardPageResponse::getCreateAt) // 기본값은 최신순 정렬
        );
        boardPage.sort(comparator.reversed()); // 항상 내림차순 정렬

        Long total = queryFactory
                .select(board.count())
                .from(board)
                .where(builder)
                .fetchOne();

        return new PageImpl<>(boardPage, pageable, total);
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
