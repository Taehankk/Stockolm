package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StockSearchResultResponse {

    private String stockName;

    private String stockCode;

    @Builder
    public StockSearchResultResponse(String stockName, String stockCode) {
        this.stockName = stockName;
        this.stockCode = stockCode;
    }
}
