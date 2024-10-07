package com.example.stockolm.domain.analystBoard.service;

import com.example.stockolm.domain.analystBoard.dto.request.CreateAnalystBoardRequest;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardPageResponse;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AnalystBoardService {
    List<LikedAnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName);

    void setMainContent(Long userId, Long analystBoardId);

    void createAnalystBoard(Long userId, CreateAnalystBoardRequest createAnalystBoardRequest);

    AnalystBoardResponse getAnalystBoard(Long analystBoardId, Long userId);

    void likeAnalystBoard(Long analystBoardId, Long userId);

    Page<AnalystBoardPageResponse> getAnalystBoardPage(String searchWord, Pageable pageable, Long userId, String searchAnalyst);
}
