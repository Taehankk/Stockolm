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
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.time.LocalDate;
import java.util.List;

import static com.example.stockolm.domain.analyst.entity.QAnalystInfo.analystInfo;
import static com.example.stockolm.domain.analystBoard.entity.QAnalystBoard.analystBoard;
import static com.example.stockolm.domain.user.entity.QUser.user;

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
                .userImagePath(analyst.getUserImagePath())
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
                .select(Projections.constructor(AnalystGoalInfoDTO.class,
                        getReliability(analystId),
                        getAccuracy(analystId)
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
                .select(Projections.constructor(StockInfoDTO.class,
                        stock.stockName,                        // 종목 이름
                        analystBoard.analystBoardId.count(),    // 종목에 대해 작성한 총 게시글 수
                        getReliabilitySum(analystBoard),        // 신뢰성 있는 글 수
                        getStockReliabilityPercent(analystBoard) // 신뢰성 있는 글 수 / 예측한 총 게시글 수 비율
                ))
                .from(analystBoard)
                .join(stock).on(analystBoard.stock.stockId.eq(stock.stockId)).fetchJoin()
                .where(analystBoard.user.userId.eq(analystId).and(analystBoard.goalDate.lt(LocalDate.now())))
                .groupBy(stock.stockName)
                .orderBy(getStockReliabilityPercent(analystBoard).desc())
                .limit(3)
                .fetch();
    }

    private NumberExpression<Long> getStockReliabilityPercent(QAnalystBoard analystBoard) {
        return getReliabilitySum(analystBoard)
                .divide(getReliabilitySum(analystBoard)).multiply(100).coalesce(0L);
    }

    private NumberExpression<Long> getReliabilitySum(QAnalystBoard analystBoard) {
        return new CaseBuilder()
                .when(analystBoard.goalDate.lt(LocalDate.now()).and(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)))
                .then(1L).otherwise(0L).sum();
    }

    // 정확도가 높은 상위 3개의 종목을 반환하는 함수
    private List<StockInfoDTO> getTopAccuracyStocks(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QStock stock = QStock.stock;

        return queryFactory
                .select(Projections.constructor(StockInfoDTO.class,
                        stock.stockName,                        // 종목 이름
                        analystBoard.analystBoardId.count(),    // 종목에 대해 작성한 총 게시글 수
                        getAccuracySum(analystBoard),           // 정확성 있는 글 수
                        getStockAccuracyPercent(analystBoard)   // 정확성 있는 글 수 / 예측한 총 게시글 수 비율
                ))
                .from(analystBoard)
                .join(stock).on(analystBoard.stock.stockId.eq(stock.stockId)).fetchJoin()
                .where(analystBoard.user.userId.eq(analystId).and(analystBoard.goalDate.lt(LocalDate.now())))
                .groupBy(stock.stockName)
                .orderBy(getStockAccuracyPercent(analystBoard).desc())
                .limit(3)
                .fetch();
    }

    private NumberExpression<Long> getStockAccuracyPercent(QAnalystBoard analystBoard) {
        return getAccuracySum(analystBoard)
                .divide(getAccuracySum(analystBoard)).multiply(100).coalesce(0L);
    }

    private NumberExpression<Long> getAccuracySum(QAnalystBoard analystBoard) {
        return new CaseBuilder()
                .when(analystBoard.goalDate.lt(LocalDate.now()).and(analystBoard.goalAccuracy.eq(GoalCategory.SUCCESS)))
                .then(1L).otherwise(0L).sum();
    }

    // 가장 신뢰도 높은 산업군 상위 3개를 반환하는 함수
    private List<IndustryDTO> getTop3Industries(Long analystId) {
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QStock stock = QStock.stock;

        return queryFactory
                .select(Projections.constructor(
                        IndustryDTO.class,
                        stock.industryName,            // 산업군 이름
                        getStockReliabilityPercent(analystBoard) // 신뢰성 있는 글 / 총 게시글 수 비율
                ))
                .from(analystBoard)
                .join(stock).on(analystBoard.stock.stockId.eq(stock.stockId)).fetchJoin()
                .where(analystBoard.user.userId.eq(analystId))
                .groupBy(stock.industryName)
                .orderBy(getStockReliabilityPercent(analystBoard).desc())
                .limit(3)
                .fetch();

    }

    // 종목에 대해 정확하게 글 쓴 갯수
    private JPAQuery<Long> getStockAccuracyCount(QAnalystBoard analystBoard) {
        return queryFactory
                .select(analystBoard.analystBoardId.countDistinct())
                .from(analystBoard)
                .where(analystBoard.goalAccuracy.eq(GoalCategory.SUCCESS));
    }

    // 종목에 대해 신뢰성있게 글 쓴 갯수
    private JPAQuery<Long> getStockReliabilityCount(QAnalystBoard analystBoard) {
        return queryFactory
                .select(analystBoard.analystBoardId.countDistinct())
                .from(analystBoard)
                .where(analystBoard.goalReliability.eq(GoalCategory.SUCCESS));
    }

    // 종목에 대한 신뢰도 %
    private NumberExpression<Integer> getReliability(Long userId) {
        JPAQuery<Long> boardSize = getGoalBoardSize(userId);
        return analystInfo.reliability.divide(boardSize).multiply(100).floor();
    }

    // 종목에 대한 정확도 %
    private NumberExpression<Integer> getAccuracy(Long userId) {
        JPAQuery<Long> boardSize = getGoalBoardSize(userId);
        return analystInfo.accuracy.divide(boardSize).multiply(100).floor();
    }

    // 종목에 대해 쓴 총 글 수
    private JPAQuery<Long> getGoalBoardSize(Long userId) {
        return queryFactory
                .select(analystBoard.countDistinct())
                .from(analystBoard)
                .where(analystBoard.goalDate.lt(LocalDate.now()).and(user.userId.eq(userId)));
    }

}
