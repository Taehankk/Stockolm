package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.entity.Comment;

import java.util.List;

public interface BoardCustomRepository {
    List<String> findImagePathById(Long boardId);

    boolean isLike(Long boardId, Long userId);

    List<Comment> findCommentById(Long boardId);
}
