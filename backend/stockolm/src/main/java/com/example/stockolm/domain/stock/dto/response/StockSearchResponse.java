package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class StockSearchResponse {

    List<RecentStock> recentStockList;
    List<HotStock> hotStockList;

    @Builder
    public StockSearchResponse(List<RecentStock> recentStockList, List<HotStock> hotStockList) {
        this.recentStockList = recentStockList;
        this.hotStockList = hotStockList;
    }

}
