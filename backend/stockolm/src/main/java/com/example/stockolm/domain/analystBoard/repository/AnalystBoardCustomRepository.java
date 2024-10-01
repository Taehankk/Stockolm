package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;

import java.util.List;

public interface AnalystBoardCustomRepository {
    List<LikedAnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName);

    void choseMainContent(Long userId, Long analystBoardId);

    boolean isLike(Long analystBoardId, Long userId);
}
