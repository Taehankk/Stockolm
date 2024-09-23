package com.example.stockolm.domain.stock.service;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.dto.response.StockSearchResponse;

import java.util.List;

public interface StockService {
    public List<FollowStockResponse> getFollowStockList(Long userId);

    void searchStock(Long userId, String stockName);

    StockSearchResponse stockSearchList(Long userId);

    void followStock(Long userId, String stockName);
}
