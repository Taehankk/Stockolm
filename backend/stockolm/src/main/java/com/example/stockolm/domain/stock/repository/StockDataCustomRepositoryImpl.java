package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.stock.entity.QStockData;
import com.example.stockolm.domain.stock.entity.StockData;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

public class StockDataCustomRepositoryImpl implements StockDataCustomRepository {

    private final JPAQueryFactory queryFactory;

    public StockDataCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<StockData> findByStockId(Long stockId) {
        QStockData stockData = QStockData.stockData;

        return queryFactory
                .selectFrom(stockData)
                .where(stockData.stock.id.eq(stockId))
                .orderBy(stockData.stockDate.asc())
                .fetch();
    }
}
