package com.example.stockolm.domain.stock.service;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;

import java.util.List;

public interface StockService {
    public List<FollowStockResponse> getFollowStockList(Long userId);

    void searchStock(Long userId, String stockName);
}
