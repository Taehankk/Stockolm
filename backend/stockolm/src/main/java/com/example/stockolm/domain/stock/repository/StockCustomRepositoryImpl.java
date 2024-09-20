package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.entity.QFavoriteStock;
import com.example.stockolm.domain.stock.entity.QStock;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

public class StockCustomRepositoryImpl implements StockCustomRepository {

    private final JPAQueryFactory queryFactory;

    public StockCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<FollowStockResponse> getFollowStockInfo(Long userId) {
        QFavoriteStock favoriteStock = QFavoriteStock.favoriteStock;
        QStock stock = QStock.stock;

        return queryFactory
                .select(Projections.constructor(FollowStockResponse.class,
                        favoriteStock.stock.stockCode, favoriteStock.stock.stockName))
                .from(favoriteStock)
                .where(favoriteStock.user.userId.eq(userId))
                .fetch();

//        return queryFactory
//                .select(Projections.constructor(FollowStockResponse.class,
//                        favoriteStock.stock.stockCode, favoriteStock.stock.stockName))
//                .from(favoriteStock)
//                .join(favoriteStock.stock, stock).fetchJoin()
//                .where(favoriteStock.user.userId.eq(userId))
//                .fetch();


    }
}
