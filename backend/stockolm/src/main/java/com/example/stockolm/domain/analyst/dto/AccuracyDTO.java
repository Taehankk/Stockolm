package com.example.stockolm.domain.analyst.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccuracyDTO {
    private String stockName;
    private Long stockSize;
    private Long stockAccuracySize;
    private Long stockAccuracyValue;

    @Builder
    public AccuracyDTO(String stockName, Long stockSize,
                        Long stockAccuracySize, Long stockAccuracyValue
    ) {
        this.stockName = stockName;
        this.stockSize = stockSize;
        this.stockAccuracySize = stockAccuracySize;
        this.stockAccuracyValue = stockAccuracyValue;
    }
}
