package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.dto.response.HotStockList;
import com.example.stockolm.domain.stock.dto.response.RecentStockList;

import java.util.List;

public interface StockCustomRepository {
    public List<FollowStockResponse> getFollowStockInfo(Long UserId);

    public List<HotStockList> getHotStockList();

    List<RecentStockList> getRecentStockList(Long userId);
}
