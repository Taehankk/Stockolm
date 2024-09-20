package com.example.stockolm.domain.board.service;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;

public interface BoardService {
    void createBoard(Long userId, CreateBoardRequest createBoardRequest);

    void modifyBoard(Long boardId, Long userId, ModifyBoardRequest modifyBoardRequest);
}
