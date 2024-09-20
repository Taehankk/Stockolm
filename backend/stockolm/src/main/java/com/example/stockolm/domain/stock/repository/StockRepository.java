package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long>, StockCustomRepository {

}
