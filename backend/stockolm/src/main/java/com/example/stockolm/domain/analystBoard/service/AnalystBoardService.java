package com.example.stockolm.domain.analystBoard.service;

import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;

import java.util.List;

public interface AnalystBoardService {
    List<AnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName);

    void setMainContent(Long userId, Long analystBoardId);
}
