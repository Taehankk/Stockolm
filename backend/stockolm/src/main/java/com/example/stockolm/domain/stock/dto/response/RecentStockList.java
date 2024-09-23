package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class RecentStockList {
    private String recentStockName;
    private String recentStockCode;

    @Builder
    public RecentStockList(String recentStockName, String recentStockCode) {
        this.recentStockName = recentStockName;
        this.recentStockCode = recentStockCode;
    }
}
