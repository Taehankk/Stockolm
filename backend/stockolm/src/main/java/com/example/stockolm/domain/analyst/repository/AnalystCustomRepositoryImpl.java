package com.example.stockolm.domain.analyst.repository;

import com.example.stockolm.domain.analyst.dto.AnalystGoalInfoDTO;
import com.example.stockolm.domain.analyst.dto.IndustryDTO;
import com.example.stockolm.domain.analyst.dto.StockInfoDTO;
import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;
import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.stock.entity.QStock;
import com.example.stockolm.domain.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AnalystCustomRepositoryImpl implements AnalystCustomRepository {

    private final JPAQueryFactory queryFactory;

    public AnalystCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public AnalystInfoResponse searchAnalystInfo(Long analystId) {

        AnalystGoalInfoDTO reliabilityAndAccuracy = getReliabilityAndAccuracy(analystId);
        int boardSize = getBoardSize(analystId).intValue();
        int followerCount = getFollowerCount(analystId).intValue();
        int analystRank = getAnalystRank(analystId);
        List<StockInfoDTO> topReliabilityStocks = getTopReliabilityStocks(analystId);
        List<StockInfoDTO> topAccuracyStocks = getTopAccuracyStocks(analystId);
        List<IndustryDTO> industryInfo = getTop3Industries(analystId);

        return AnalystInfoResponse.builder()
                .boardSize(boardSize)
                .follower(followerCount)
                .totalAnalystRank(analystRank)
                .reliability(reliabilityAndAccuracy.getReliability())
                .reliabilityStock(topReliabilityStocks)
                .accuracy(reliabilityAndAccuracy.getAccuracy())
                .accuracyStock(topAccuracyStocks)
                .industry(industryInfo)
                .build();
    }


    public Long getBoardSize(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;

        return queryFactory
                .select(analystBoard.count())
                .from(analystBoard)
                .where(analystBoard.user.userId.eq(analystId))
                .fetchOne();
    }

    public Long getFollowerCount(Long analystId) {
        QFollow follow = QFollow.follow;

        return queryFactory
                .select(follow.count())
                .from(follow)
                .where(follow.analyst.userId.eq(analystId))
                .fetchOne();
    }

    public int getAnalystRank(Long analystId) {
        QAnalystInfo analystInfo = QAnalystInfo.analystInfo;

        // 현재 분석가의 점수
        int targetScore = queryFactory
                .select(analystInfo.totalAnalystScore)
                .from(analystInfo)
                .where(analystInfo.user.userId.eq(analystId))
                .fetchOne();

        // 랭킹 추출
        return queryFactory
                .select(analystInfo.count())
                .from(analystInfo)
                .where(analystInfo.totalAnalystScore.gt(targetScore))
                .fetchOne()
                .intValue() + 1;
    }

    public AnalystGoalInfoDTO getReliabilityAndAccuracy(Long analystId) {
        QAnalystInfo analystInfo = QAnalystInfo.analystInfo;
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;

        AnalystGoalInfoDTO analystGoalInfoDTO = queryFactory
                .select(Projections.constructor(
                        AnalystGoalInfoDTO.class,
                        analystInfo.reliability.divide(analystBoard.countDistinct()).floor(),
                        analystInfo.accuracy.divide(analystBoard.countDistinct()).floor()
                ))
                .from(analystInfo)
                .join(analystBoard).on(analystBoard.user.userId.eq(analystId))
                .groupBy(analystInfo.accuracy, analystInfo.reliability)
                .where(analystInfo.user.userId.eq(analystId))
                .fetchOne();

        if (analystGoalInfoDTO.reliability == null || analystGoalInfoDTO.accuracy == null) {
            return AnalystGoalInfoDTO.builder()
                    .accuracy(0.0)
                    .reliability(0.0)
                    .build();
        }

        return analystGoalInfoDTO;
    }


    // 신뢰도가 높은 상위 3개의 종목을 반환하는 함수
    private List<StockInfoDTO> getTopReliabilityStocks(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QStock stock = QStock.stock;

        return null;
    }

    // 정확도가 높은 상위 3개의 종목을 반환하는 함수
    private List<StockInfoDTO> getTopAccuracyStocks(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QStock stock = QStock.stock;

        return null;
    }

    // 가장 신뢰도 높은 산업군 상위 3개를 반환하는 함수
    private List<IndustryDTO> getTop3Industries(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QStock stock = QStock.stock;

        return null;
    }

}
