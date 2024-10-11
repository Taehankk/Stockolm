package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.entity.StockData;

import java.util.List;

public interface StockDataCustomRepository {
    List<StockData> findByStockId(Long stockId);
}
