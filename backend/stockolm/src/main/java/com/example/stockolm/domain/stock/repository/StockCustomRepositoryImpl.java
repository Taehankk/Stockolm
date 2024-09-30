package com.example.stockolm.domain.stock.repository;

import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.stock.dto.response.*;
import com.example.stockolm.domain.stock.entity.QFavoriteStock;
import com.example.stockolm.domain.stock.entity.QStock;
import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.user.entity.QUserSearchList;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.Collections;
import java.util.List;

public class StockCustomRepositoryImpl implements StockCustomRepository {

    private final JPAQueryFactory queryFactory;

    public StockCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<FollowStockResponse> getFollowStockInfo(Long userId) {
        QFavoriteStock favoriteStock = QFavoriteStock.favoriteStock;

        return queryFactory
                .select(Projections.constructor(FollowStockResponse.class,
                        favoriteStock.stock.stockCode, favoriteStock.stock.stockName))
                .from(favoriteStock)
                .where(favoriteStock.user.userId.eq(userId))
                .fetch();
    }

    @Override
    public List<HotStock> getHotStockList() {
        QStock stock = QStock.stock;

        return queryFactory
                .select(Projections.constructor(HotStock.class,
                        stock.stockCode, stock.stockName))
                .from(stock)
                .orderBy(stock.stockSearchCnt.desc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<RecentStock> getRecentStockList(Long userId) {
        if (userId == null) {
            return Collections.emptyList(); // 빈 리스트 반환
        }

        QStock stock = QStock.stock;
        QUserSearchList userSearchList = QUserSearchList.userSearchList;


        return queryFactory
                .select(Projections.constructor(RecentStock.class,
                        stock.stockName, stock.stockCode))
                .from(stock)
                .innerJoin(userSearchList)
                .on(stock.stockName.eq(userSearchList.stockSearchContent))
                .where(userSearchList.user.userId.eq(userId))
                .orderBy(userSearchList.updateAt.desc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<StockSearchResultResponse> findBySearchKeyword(String searchKeyword) {

        QStock stock = QStock.stock;

        return queryFactory
                .select(Projections.constructor(StockSearchResultResponse.class,
                        stock.stockName, stock.stockCode))
                .from(stock)
                .where(stock.stockName.contains(searchKeyword))
                .fetch();
    }

    @Override
    public List<AnalyzedStockResponse> getAnalyzedStockList(Long UserId) {
        QStock stock = QStock.stock;
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;

        return queryFactory
                .select(Projections.constructor(AnalyzedStockResponse.class,
                        stock.stockName, stock.stockCode)).distinct()
                .from(analystBoard)
                .join(analystBoard.stock, stock)
                .where(analystBoard.user.userId.eq(UserId))
                .fetch();
    }
}
