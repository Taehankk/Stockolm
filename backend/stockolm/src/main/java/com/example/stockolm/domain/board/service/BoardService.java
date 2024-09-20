package com.example.stockolm.domain.board.service;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;

public interface BoardService {
    void createBoard(Long userId, CreateBoardRequest createBoardRequest);
}
