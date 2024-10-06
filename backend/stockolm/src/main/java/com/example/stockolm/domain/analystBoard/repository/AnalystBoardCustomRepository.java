package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardPageResponse;
import com.example.stockolm.domain.stock.dto.response.BestAnalystResponse;

import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface AnalystBoardCustomRepository {
    List<LikedAnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName);

    void choseMainContent(Long userId, Long analystBoardId);

    boolean isLike(Long analystBoardId, Long userId);

    List<BestAnalystResponse> findBestAnalystByStockId(Long stockId);

    Page<AnalystBoardPageResponse> getAnalystBoardPage(String searchWord, Pageable pageable, Long userId);
}
