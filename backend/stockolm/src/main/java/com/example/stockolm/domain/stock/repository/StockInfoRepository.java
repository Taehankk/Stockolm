package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.entity.StockInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockInfoRepository extends JpaRepository<StockInfo,Long> {
    StockInfo findByStockCode(String stockName);
}
