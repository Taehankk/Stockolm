package com.example.stockolm.domain.stock.dto.response;

import com.example.stockolm.domain.stock.entity.StockData;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class StockDetailResponse {

    private List<StockData> stockData;

    private Boolean isFollow;

    @Builder
    public StockDetailResponse(List<StockData> stockData, Boolean isFollow) {
        this.stockData = stockData;
        this.isFollow = isFollow;
    }

}
