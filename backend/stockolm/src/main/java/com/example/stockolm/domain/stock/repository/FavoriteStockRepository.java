package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.entity.FavoriteStock;
import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteStockRepository extends JpaRepository<FavoriteStock,Long> {
    Boolean existsByUser_UserIdAndStock_StockId(Long userId, Long stockId);

    Optional<FavoriteStock> findByStockAndUser(Stock stock, User user);
}
