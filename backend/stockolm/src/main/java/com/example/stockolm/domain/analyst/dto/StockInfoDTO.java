package com.example.stockolm.domain.analyst.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StockInfoDTO {
    private String stockName;
    private Long stockSize;
    private Long stockReliabilitySize;
    private Long stockReliabilityValue;

    @Builder
    public StockInfoDTO(String stockName, Long stockSize,
                        Long stockReliabilitySize, Long stockReliabilityValue
    ) {
        this.stockName = stockName;
        this.stockSize = stockSize;
        this.stockReliabilitySize = stockReliabilitySize;
        this.stockReliabilityValue = stockReliabilityValue;
    }
}
