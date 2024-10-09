package com.example.stockolm.domain.follow.repository;

import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.rank.dto.response.AnalystRankInfoResponse;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.time.LocalDate;
import java.util.List;

import static com.example.stockolm.domain.analyst.entity.QAnalystInfo.analystInfo;
import static com.example.stockolm.domain.analystBoard.entity.QAnalystBoard.analystBoard;
import static com.example.stockolm.domain.rank.repository.RankCustomRepository.ROW_NUM_QUERY;
import static com.example.stockolm.domain.user.entity.QUser.user;

public class FollowCustomRepositoryImpl implements FollowCustomRepository {

    private final JPAQueryFactory queryFactory;

    public FollowCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<FollowAnalystResponse> getFollowAnalystInfo(Long userId) {
        QUser user = QUser.user;
        QFollow follow = QFollow.follow;
        QAnalystInfo analystInfo = QAnalystInfo.analystInfo;
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;

        // 서브 쿼리를 이용하여 전체 애널리스트 중 해당 애널리스트의 순위를 계산
        NumberExpression<Integer> rankExpression = Expressions.asNumber(
                JPAExpressions.select(analystInfo.totalAnalystScore.count())
                        .from(analystInfo)
                        .where(analystInfo.totalAnalystScore.gt(
                                JPAExpressions.select(analystInfo.totalAnalystScore)
                                        .from(analystInfo)
                                        .where(analystInfo.user.userId.eq(user.userId))
                        ))
        ).intValue().add(1);

        return queryFactory
                .select(Projections.constructor(FollowAnalystResponse.class,
                        user.userName,
                        user.userNickname,
                        user.userImagePath,
                        getStockReliabilityPercent(analystBoard),
                        getStockAccuracyPercent(analystBoard),
//                        getAnalystReliability(user.userId),
//                        getAnalystAccuracy(user.userId),
                        rankExpression)) // 전체 애널리스트 중 해당 애널리스트의 랭킹
                .from(follow)
                .join(user).on(user.userId.eq(follow.analyst.userId))
                .join(analystInfo).on(analystInfo.user.userId.eq(user.userId))
                .leftJoin(analystBoard).on(analystBoard.user.userId.eq(user.userId))
                .where(follow.user.userId.eq(userId))
                .groupBy(user.userId, analystInfo.totalAnalystScore,
                        analystInfo.reliability, analystInfo.accuracy)
                .fetch();

    }

    private Expression<?> getAnalystRank(NumberPath<Long> userId) {
        return queryFactory
                .select(analystInfo.id.sum())
                .from(analystInfo)
                .where(analystInfo.user.userId.eq(userId)
                        .and(analystInfo.totalAnalystScore.gt(analystInfo.totalAnalystScore)));
    }


    private NumberExpression<Long> getStockReliabilityPercent(QAnalystBoard analystBoard) {
        return getReliabilitySum(analystBoard)
                .divide(analystBoard.goalDate.lt(LocalDate.now()).count()).multiply(100).coalesce(0L);
    }

    private NumberExpression<Long> getReliabilitySum(QAnalystBoard analystBoard) {
        return new CaseBuilder()
                .when(analystBoard.goalDate.lt(LocalDate.now()).and(analystBoard.goalReliability.eq(GoalCategory.SUCCESS)))
                .then(1L).otherwise(0L).sum();
    }

    private NumberExpression<Long> getStockAccuracyPercent(QAnalystBoard analystBoard) {
        return getAccuracySum(analystBoard)
                .divide(analystBoard.goalDate.lt(LocalDate.now()).count()).multiply(100).coalesce(0L);
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
                .select(analystBoard.analystBoardId.count())
                .from(analystBoard)
                .where(analystBoard.goalDate.lt(LocalDate.now()).and(user.userId.eq(userId)));
    }
}