package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;

import java.util.List;

public interface StockCustomRepository {
    public List<FollowStockResponse> getFollowStockInfo(Long UserId);

    public List<String> getHotStockCodeList();

    public List<String> getHotStockNameList();

    public List<String> getRecentStockNameList(Long userId);

    public List<String> getRecentStockCodeList(Long userId);
}
