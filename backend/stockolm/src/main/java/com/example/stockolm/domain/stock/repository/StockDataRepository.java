package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.entity.StockData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockDataRepository extends JpaRepository<StockData,Long>, StockDataCustomRepository {
}
