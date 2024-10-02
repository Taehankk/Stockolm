package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.dto.response.BoardPageResponse;
import com.example.stockolm.domain.board.dto.response.BoardResponse;
import com.example.stockolm.domain.board.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardCustomRepository {
    Page<BoardPageResponse> getBoardPage(String searchWord, Pageable pageable, Long userId);

    List<String> findImagePathById(Long boardId);

    boolean isLike(Long boardId, Long userId);

    List<Comment> findCommentById(Long boardId);
}
