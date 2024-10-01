package com.example.stockolm.domain.analyst.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StockInfoDTO {
    private String stockName;
    private Long stockSize;
    private Long stockReliabilitySize;
//    private float stockReliabilityValue;

    @Builder
    public StockInfoDTO(String stockName, Long stockSize, Long stockReliabilitySize
//            , float stockReliabilityValue
    ) {
        this.stockName = stockName;
        this.stockSize = stockSize;
        this.stockReliabilitySize = stockReliabilitySize;
//        this.stockReliabilityValue = stockReliabilityValue;
    }
}
