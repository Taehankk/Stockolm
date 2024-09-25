package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class AnalyzedStockResponse {

    private String stockCode;
    private String stockName;

    @Builder
    public AnalyzedStockResponse(String stockCode, String stockName) {
        this.stockCode = stockCode;
        this.stockName = stockName;
    }
}
