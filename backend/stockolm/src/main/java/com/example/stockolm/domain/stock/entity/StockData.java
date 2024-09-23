package com.example.stockolm.domain.stock.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class StockData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long StockDataId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private String stockStartValue;

    private String stockEndValue;

    private String stockDate;

    private String stockHigh;

    private String stockLow;

    private String stockVolume;
}
