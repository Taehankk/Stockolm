package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.entity.Comment;

import java.util.List;

public interface BoardCustomRepository {

    public List<String> findImagePathById(Long boardId);

    public boolean isLike(Long boardId, Long userId);

    public List<Comment> findCommentById(Long boardId);
}
