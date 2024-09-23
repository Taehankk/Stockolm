package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class StockSearchResponse {

    List<RecentStockList> recentStockList;
    List<HotStockList> hotStockList;

    @Builder
    public StockSearchResponse(List<RecentStockList> recentStockList, List<HotStockList> hotStockList) {
        this.recentStockList = recentStockList;
        this.hotStockList = hotStockList;
    }

}
