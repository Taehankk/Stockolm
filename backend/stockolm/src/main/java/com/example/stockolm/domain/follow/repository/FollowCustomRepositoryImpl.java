package com.example.stockolm.domain.follow.repository;

import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.follow.entity.QFollow;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

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

        return queryFactory
                .select(Projections.constructor(FollowAnalystResponse.class,
                        user.userName, user.userNickname, user.userImagePath,
                        analystInfo.reliability, analystInfo.accuracy, analystInfo.totalAnalystScore))
                .from(follow)
                .join(follow.analyst, user)
                .join(analystInfo).on(analystInfo.user.userId.eq(user.userId))
                .where(follow.user.userId.eq(userId))
                .fetch();

    }
}