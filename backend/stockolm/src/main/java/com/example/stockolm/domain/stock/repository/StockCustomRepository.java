package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.dto.response.HotStock;
import com.example.stockolm.domain.stock.dto.response.RecentStock;

import java.util.List;

public interface StockCustomRepository {
    public List<FollowStockResponse> getFollowStockInfo(Long UserId);

    public List<HotStock> getHotStockList();

    List<RecentStock> getRecentStockList(Long userId);
}
