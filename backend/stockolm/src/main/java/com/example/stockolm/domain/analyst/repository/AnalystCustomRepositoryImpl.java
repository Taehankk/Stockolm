package com.example.stockolm.domain.analyst.repository;

import com.example.stockolm.domain.analyst.dto.AnalystGoalInfoDTO;
import com.example.stockolm.domain.analyst.dto.IndustryDTO;
import com.example.stockolm.domain.analyst.dto.StockInfoDTO;
import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;
import com.example.stockolm.domain.analyst.dto.response.AnalystSimpleInfoResponse;
import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.stock.entity.QStock;
import com.example.stockolm.domain.user.entity.QUser;
import com.example.stockolm.domain.user.entity.User;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
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
    public AnalystInfoResponse searchAnalystInfo(User analyst) {

        Long analystId = analyst.getUserId();

        AnalystGoalInfoDTO reliabilityAndAccuracy = getReliabilityAndAccuracy(analystId);
        int boardSize = getBoardSize(analystId).intValue();
        int followerCount = getFollowerCount(analystId).intValue();
        int analystRank = getAnalystRank(analystId);
        List<StockInfoDTO> topReliabilityStocks = getTopReliabilityStocks(analystId);
        List<StockInfoDTO> topAccuracyStocks = getTopAccuracyStocks(analystId);
        List<IndustryDTO> industryInfo = getTop3Industries(analystId);

        return AnalystInfoResponse.builder()
                .userName(analyst.getUserName())
                .userNickName(analyst.getUserNickname())
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

    @Override
    public List<AnalystSimpleInfoResponse> searchAnalystSimpleInfo(String analystName) {
        QUser user = QUser.user;
        QAnalystInfo analystInfo = QAnalystInfo.analystInfo;

        return queryFactory
                .select(Projections.constructor(
                        AnalystSimpleInfoResponse.class,
                        user.userName,
                        user.userNickname
                ))
                .from(user)
                .join(analystInfo).on(user.userId.eq(analystInfo.user.userId))
                .where(user.userName.contains(analystName))
                .fetch();
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
        Integer targetScore = queryFactory
                .select(analystInfo.totalAnalystScore)
                .from(analystInfo)
                .where(analystInfo.user.userId.eq(analystId))
                .fetchOne();

        if (targetScore == null) {
            targetScore = 0;
        }

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
                        analystInfo.reliability.divide(analystBoard.countDistinct()).multiply(100).floor(),
                        analystInfo.accuracy.divide(analystBoard.countDistinct()).multiply(100).floor()
                ))
                .from(analystInfo)
                .join(analystBoard).on(analystBoard.user.userId.eq(analystId))
                .groupBy(analystInfo.accuracy, analystInfo.reliability)
                .where(analystInfo.user.userId.eq(analystId))
                .fetchOne();

        if (analystGoalInfoDTO == null || analystGoalInfoDTO.reliability == null || analystGoalInfoDTO.accuracy == null) {
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

        return queryFactory
                .select(Projections.constructor(
                        StockInfoDTO.class,
                        stock.stockName,            // 종목 이름
                        analystBoard.analystBoardId.count(),    // 종목에 대해 작성한 총 게시글 수
                        new CaseBuilder()
                                .when(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum(), // 신뢰성 있는 글을 쓴 게시글 수
                        new CaseBuilder()
                                .when(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum()
                                .divide(analystBoard.analystBoardId.count()).multiply(100) // 신뢰성 있는 글 / 총 게시글 수 비율
                ))
                .from(analystBoard)
                .join(stock).on(analystBoard.stock.stockId.eq(stock.stockId)).fetchJoin()
                .where(analystBoard.user.userId.eq(analystId))
                .groupBy(stock.stockName)
                .orderBy(new CaseBuilder()
                        .when(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum()
                        .divide(analystBoard.analystBoardId.count()).multiply(100).desc())
                .limit(3)
                .fetch();
    }

    // 정확도가 높은 상위 3개의 종목을 반환하는 함수
    private List<StockInfoDTO> getTopAccuracyStocks(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QStock stock = QStock.stock;

        return queryFactory
                .select(Projections.constructor(
                        StockInfoDTO.class,
                        stock.stockName,
                        analystBoard.analystBoardId.count(),    // 종목에 대해 작성한 총 게시글 수
                        new CaseBuilder()
                                .when(analystBoard.goalAccuracy.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum(), // 신뢰성 있는 글을 쓴 게시글 수
                        new CaseBuilder()
                                .when(analystBoard.goalAccuracy.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum()
                                .divide(analystBoard.analystBoardId.count()).multiply(100) // 신뢰성 있는 글 / 총 게시글 수 비율
                ))
                .from(analystBoard)
                .join(stock).on(analystBoard.stock.stockId.eq(stock.stockId)).fetchJoin()
                .where(analystBoard.user.userId.eq(analystId))
                .groupBy(stock.stockName)
                .orderBy(new CaseBuilder()
                        .when(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum()
                        .divide(analystBoard.analystBoardId.count()).multiply(100).desc())
                .limit(3)
                .fetch();
    }

    // 가장 신뢰도 높은 산업군 상위 3개를 반환하는 함수
    private List<IndustryDTO> getTop3Industries(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QStock stock = QStock.stock;

        return queryFactory
                .select(Projections.constructor(
                        IndustryDTO.class,
                        stock.industryName,            // 종목 이름
                        new CaseBuilder()
                                .when(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum()
                                .divide(analystBoard.analystBoardId.count()).multiply(100) // 신뢰성 있는 글 / 총 게시글 수 비율
                ))
                .from(analystBoard)
                .join(stock).on(analystBoard.stock.stockId.eq(stock.stockId)).fetchJoin()
                .where(analystBoard.user.userId.eq(analystId))
                .groupBy(stock.industryName)
                .orderBy(new CaseBuilder()
                        .when(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)).then(1L).otherwise(0L).sum()
                        .divide(analystBoard.analystBoardId.count()).multiply(100).desc())
                .limit(3)
                .fetch();

    }

}
