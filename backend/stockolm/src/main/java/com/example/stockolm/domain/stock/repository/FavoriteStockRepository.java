package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.entity.FavoriteStock;
import com.example.stockolm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteStockRepository extends JpaRepository<FavoriteStock,Long> {
    Boolean existsByUser(User user);
}
