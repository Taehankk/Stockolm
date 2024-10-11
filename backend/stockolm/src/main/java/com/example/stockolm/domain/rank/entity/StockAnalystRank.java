package com.example.stockolm.domain.rank.entity;

import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockAnalystRank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockAnalystRankId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private int stockAnalystRank;

    private LocalDateTime updateAt;

    private float reliability;

    private float accuracy;

    @PreUpdate
    public void preUpdate() {
        this.updateAt = LocalDateTime.now();
    }

}
