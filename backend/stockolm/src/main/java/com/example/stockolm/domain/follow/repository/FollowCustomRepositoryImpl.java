package com.example.stockolm.domain.follow.repository;

import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.types.Projections;
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

        return queryFactory
                .select(Projections.constructor(FollowAnalystResponse.class,
                        user.userName,
                        user.userNickname,
                        user.userImagePath,
                        analystInfo.reliability.divide(analystBoard.countDistinct()).floor(),
                        analystInfo.accuracy.divide(analystBoard.countDistinct()).floor(),
                        analystInfo.totalAnalystScore))
                .from(follow)
                .join(follow.analyst, user)
                .join(analystInfo).on(analystInfo.user.userId.eq(user.userId))
                .join(analystBoard).on(analystInfo.user.userId.eq(analystBoard.user.userId))
                .where(follow.user.userId.eq(userId))
                .groupBy(user.userId, user.userName, user.userNickname, user.userImagePath,
                        analystInfo.totalAnalystScore, analystInfo.reliability, analystInfo.accuracy)
                .fetch();

    }
}