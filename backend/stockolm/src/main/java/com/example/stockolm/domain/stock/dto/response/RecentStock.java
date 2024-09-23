package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecentStock {
    private String recentStockName;
    private String recentStockCode;

    @Builder
    public RecentStock(String recentStockName, String recentStockCode) {
        this.recentStockName = recentStockName;
        this.recentStockCode = recentStockCode;
    }
}
