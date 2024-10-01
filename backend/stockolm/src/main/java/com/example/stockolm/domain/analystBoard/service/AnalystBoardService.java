package com.example.stockolm.domain.analystBoard.service;

import com.example.stockolm.domain.analystBoard.dto.request.CreateAnalystBoardRequest;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;

import java.util.List;

public interface AnalystBoardService {
    List<LikedAnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName);

    void setMainContent(Long userId, Long analystBoardId);

    void createAnalystBoard(Long userId, CreateAnalystBoardRequest createAnalystBoardRequest);

    AnalystBoardResponse retrieveAnalystBoard(Long analystBoardId, Long userId);

    void likeAnalystBoard(Long analystBoardId, Long userId);
}
