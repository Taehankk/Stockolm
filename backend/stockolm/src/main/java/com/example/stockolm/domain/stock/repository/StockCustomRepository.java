package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;

import java.util.List;

public interface StockCustomRepository {
    public List<FollowStockResponse> getFollowStockInfo(Long UserId);
}
