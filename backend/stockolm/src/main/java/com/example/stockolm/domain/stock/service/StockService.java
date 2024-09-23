package com.example.stockolm.domain.stock.service;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.dto.response.StockDetailResponse;
import com.example.stockolm.domain.stock.dto.response.StockSearchResponse;

import java.util.List;

public interface StockService {
    public List<FollowStockResponse> getFollowStockList(Long userId);

    void createStockSearchLog(Long userId, String stockName);

    StockSearchResponse stockSearchList(Long userId);

    void followStock(Long userId, String stockName);

    StockDetailResponse getStockDetail(Long userId, String stockName);
}
