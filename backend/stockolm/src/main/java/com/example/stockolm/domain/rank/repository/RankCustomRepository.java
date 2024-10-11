package com.example.stockolm.domain.rank.repository;


import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.rank.dto.response.AnalystRankInfoResponse;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.example.stockolm.domain.analyst.entity.QAnalystInfo.analystInfo;
import static com.example.stockolm.domain.analystBoard.entity.QAnalystBoard.analystBoard;
import static com.example.stockolm.domain.user.entity.QUser.user;
import static org.apache.logging.log4j.util.Strings.isEmpty;

@Repository
@RequiredArgsConstructor
public class RankCustomRepository {

    private final JPAQueryFactory queryFactory;

    private static final String RELIABILITY = "reliability";
    private static final String ACCURACY = "accuracy";

    public static final String ROW_NUM_QUERY = "ROW_NUMBER() OVER (ORDER BY {0} DESC)";

    public Page<AnalystRankInfoResponse> getTotalRank(String rankValue, String analystName, Pageable pageable) {
        QAnalystInfo analystInfo = QAnalystInfo.analystInfo;
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QUser user = QUser.user;

        List<AnalystRankInfoResponse> totalRank = queryFactory
                .select(Projections.constructor(AnalystRankInfoResponse.class,
                        user.userName,
                        user.userNickname,
                        user.userImagePath,
                        Expressions.numberTemplate(Integer.class, ROW_NUM_QUERY, getRankExpression(rankValue, user.userId)),
                        analystBoard.countDistinct(),
                        analystInfo.totalAnalystScore,
                        getStockReliabilityPercent(analystBoard),
                        getStockAccuracyPercent(analystBoard)
                ))
                .from(analystBoard)
                .join(user).on(user.userId.eq(analystBoard.user.userId))
                .join(analystInfo).on(analystInfo.user.userId.eq(user.userId))
                .where(userNameContains(analystName))
                .groupBy(user.userId, user.userName, user.userNickname, user.userImagePath,
                        analystInfo.totalAnalystScore, analystInfo.reliability, analystInfo.accuracy)
                .orderBy(getRankExpression(rankValue, user.userId).desc(), analystInfo.totalAnalystScore.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .select(user.userId).distinct()
                .from(analystBoard)
                .join(user).on(user.userId.eq(analystBoard.user.userId))
                .fetchCount();

        return new PageImpl<>(totalRank, pageable, total);
    }

    private ComparableExpressionBase<?> getRankExpression(String rankValue, NumberPath<Long> userId) {

        if (rankValue != null && rankValue.equals(RELIABILITY)) {
            return getAnalystReliability(userId);
        } else if (rankValue != null && rankValue.equals(ACCURACY)) {
            return getAnalystAccuracy(userId);
        }
        return analystInfo.totalAnalystScore;
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

    private NumberExpression<Long> getStockAccuracyPercent(QAnalystBoard analystBoard) {
        return getAccuracySum(analystBoard)
                .divide(getAccuracySum(analystBoard)).multiply(100).coalesce(0L);
    }

    private NumberExpression<Long> getAccuracySum(QAnalystBoard analystBoard) {
        return new CaseBuilder()
                .when(analystBoard.goalDate.lt(LocalDate.now()).and(analystBoard.goalAccuracy.eq(GoalCategory.SUCCESS)))
                .then(1L).otherwise(0L).sum();
    }

    private NumberExpression<Integer> getAnalystReliability(NumberPath<Long> userId) {
        JPAQuery<Long> boardSize = getGoalBoardSize(userId);
        return analystInfo.reliability.divide(boardSize).multiply(100).floor();
    }

    private NumberExpression<Integer> getAnalystAccuracy(NumberPath<Long> userId) {
        JPAQuery<Long> boardSize = getGoalBoardSize(userId);
        return analystInfo.accuracy.divide(boardSize).multiply(100).floor();
    }

    private JPAQuery<Long> getGoalBoardSize(NumberPath<Long> userId) {
        return queryFactory
                .select(analystBoard.countDistinct())
                .from(analystBoard)
                .where(analystBoard.goalDate.lt(LocalDate.now()).and(user.userId.eq(userId)));
    }

    private BooleanExpression userNameContains(String userName) {
        return isEmpty(userName) ? null : user.userName.contains(userName);
    }

}
