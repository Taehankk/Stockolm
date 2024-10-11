package com.example.stockolm.domain.stock.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockId;

    private String stockCode;

    private String stockName;

    private String industryName;

    private int stockSearchCnt;

    private String companyImagePath;

    public void plusStockSearchCnt(){
        stockSearchCnt++;
    }

}
