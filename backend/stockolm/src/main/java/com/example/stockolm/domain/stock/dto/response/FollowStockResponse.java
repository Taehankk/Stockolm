package com.example.stockolm.domain.stock.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowStockResponse {

    private String stockCode;
    private String stockName;

    @Builder
    public FollowStockResponse(String stockCode, String stockName) {
        this.stockCode = stockCode;
        this.stockName = stockName;
    }
}
