package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;

import java.util.List;

public interface AnalystBoardCustomRepository {
    List<AnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName);
}
