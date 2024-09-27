package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.dto.response.*;

import java.util.List;

public interface StockCustomRepository {
    public List<FollowStockResponse> getFollowStockInfo(Long UserId);

    public List<HotStock> getHotStockList();

    List<RecentStock> getRecentStockList(Long userId);

    List<StockSearchResultResponse> findBySearchKeyword(String searchKeyword);

    List<AnalyzedStockResponse> getAnalyzedStockList(Long UserId);
}
