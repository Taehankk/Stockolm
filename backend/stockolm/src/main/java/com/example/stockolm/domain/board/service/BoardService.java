package com.example.stockolm.domain.board.service;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.dto.request.CreateCommentRequest;
import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;
import com.example.stockolm.domain.board.dto.response.BoardResponse;

public interface BoardService {
    void createBoard(Long userId, CreateBoardRequest createBoardRequest);

    void modifyBoard(Long boardId, Long userId, ModifyBoardRequest modifyBoardRequest);

    void removeBoard(Long boardId, Long userId);

    BoardResponse retrieveBoard(Long boardId);

    void likeBoard(Long boardId, Long userId);

    void createComment(Long boardId, Long userId, CreateCommentRequest createCommentRequest);
}
