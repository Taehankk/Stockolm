package com.example.stockolm.domain.stock.dto.response;

import lombok.Getter;

@Getter
public class SearchStockResponse {
    private final Long stockId;

    public SearchStockResponse(Long stockId) {
        this.stockId = stockId;
    }
}
