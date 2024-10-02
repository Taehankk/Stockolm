package com.example.stockolm.domain.follow.repository;

import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.example.stockolm.domain.analyst.entity.QAnalystInfo.analystInfo;
import static com.example.stockolm.domain.analystBoard.entity.QAnalystBoard.analystBoard;

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
        ).intValue();

        return queryFactory
                .select(Projections.constructor(FollowAnalystResponse.class,
                        user.userName,
                        user.userNickname,
                        user.userImagePath,
                        analystInfo.reliability.divide(analystBoard.countDistinct()).floor(),
                        analystInfo.accuracy.divide(analystBoard.countDistinct()).floor(),
                        rankExpression)) // 전체 애널리스트 중 해당 애널리스트의 랭킹
                .from(follow)
                .join(follow.analyst, user)
                .join(analystInfo).on(analystInfo.user.userId.eq(user.userId))
                .leftJoin(analystBoard).on(analystBoard.user.userId.eq(analystInfo.user.userId))
                .where(follow.user.userId.eq(userId))
                .groupBy(analystInfo.user.userId, analystInfo.reliability,
                        analystInfo.accuracy, analystInfo.totalAnalystScore)
                .fetch();

    }
}