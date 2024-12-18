package com.example.stockolm.domain.stock.service;

import com.example.stockolm.domain.stock.dto.response.*;
import com.example.stockolm.domain.stock.entity.StockInfo;
import reactor.core.publisher.Flux;

import java.util.List;

public interface StockService {
    public List<FollowStockResponse> getFollowStockList(Long userId);

    SearchStockResponse createStockSearchLog(Long userId, String stockName);

    StockSearchResponse stockSearchList(Long userId);

    void followStock(Long userId, String stockName);

    StockDetailResponse getStockDetail(Long userId, String stockName);

    List<StockSearchResultResponse> getStockSearchResult(String searchKeyword);

    List<AnalyzedStockResponse> getAnalyzedStockList(Long userId);

    StockInfo getStockInfo(String stockCode);

    List<BestAnalystResponse> getBestAnalyst(Long stockId);

    StockIsFollowedResponse isFollowed(Long userId, String stockName);
}
