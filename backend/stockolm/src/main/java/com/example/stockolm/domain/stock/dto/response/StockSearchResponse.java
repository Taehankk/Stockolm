package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class StockSearchResponse {
    List<String> recentStockCodeList = new ArrayList<>();
    List<String> recentStockNameList = new ArrayList<>();
    List<String> hotStockCodeList = new ArrayList<>();
    List<String> hotStockNameList = new ArrayList<>();

    @Builder
    public StockSearchResponse(List<String> recentStockCodeList, List<String> recentStockNameList, List<String> hotStockCodeList, List<String> hotStockNameList){
        this.recentStockCodeList = recentStockCodeList;
        this.recentStockNameList = recentStockNameList;
        this.hotStockCodeList = hotStockCodeList;
        this.hotStockNameList = hotStockNameList;
    }
}
