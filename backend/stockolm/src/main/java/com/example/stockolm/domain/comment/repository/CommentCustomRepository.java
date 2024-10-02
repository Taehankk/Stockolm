package com.example.stockolm.domain.comment.repository;

import com.example.stockolm.domain.comment.dto.response.CommentResponse;

import java.util.List;

public interface CommentCustomRepository {
    List<CommentResponse> findByBoardId(Long boardId);
}
