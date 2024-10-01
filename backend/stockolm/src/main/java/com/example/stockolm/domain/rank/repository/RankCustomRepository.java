package com.example.stockolm.domain.rank.repository;


import com.example.stockolm.domain.analyst.entity.QAnalystInfo;
import com.example.stockolm.domain.analystBoard.entity.QAnalystBoard;
import com.example.stockolm.domain.rank.dto.response.AnalystRankInfoResponse;
import com.example.stockolm.domain.user.entity.QUser;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.stockolm.domain.analyst.entity.QAnalystInfo.analystInfo;
import static com.example.stockolm.domain.analystBoard.entity.QAnalystBoard.analystBoard;

@Repository
@RequiredArgsConstructor
public class RankCustomRepository {

    private final JPAQueryFactory queryFactory;

    private static final String RELIABILITY = "reliability";
    private static final String ACCURACY = "accuracy";

    private static final String ROW_NUM_QUERY = "ROW_NUMBER() OVER (ORDER BY {0} DESC)";

    public Page<AnalystRankInfoResponse> getTotalRank(String rankValue, Pageable pageable) {
        QAnalystInfo analystInfo = QAnalystInfo.analystInfo;
        QAnalystBoard analystBoard = QAnalystBoard.analystBoard;
        QUser user = QUser.user;

        List<AnalystRankInfoResponse> totalRank = queryFactory
                .select(Projections.constructor(AnalystRankInfoResponse.class,
                        user.userName,
                        user.userNickname,
                        user.userImagePath,
                        Expressions.numberTemplate(Integer.class, ROW_NUM_QUERY, getRankExpression(rankValue)),
                        analystBoard.countDistinct(),
                        analystInfo.reliability.divide(analystBoard.countDistinct()).floor(),
                        analystInfo.accuracy.divide(analystBoard.countDistinct()).floor()
                ))
                .from(analystBoard)
                .join(user).on(user.userId.eq(analystBoard.user.userId))
                .join(analystInfo).on(analystInfo.user.userId.eq(user.userId))
                .groupBy(user.userId, user.userName, user.userNickname, user.userImagePath,
                        analystInfo.totalAnalystScore, analystInfo.reliability, analystInfo.accuracy)
                .orderBy(getRankExpression(rankValue).desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .select(user.countDistinct())
                .from(analystBoard)
                .join(user).on(user.userId.eq(analystBoard.user.userId))
//                .from(analystInfo)
//                .join(analystInfo.user, user)
//                .join(analystBoard).on(analystBoard.user.userId.eq(user.userId))
                .fetchCount();

        return new PageImpl<>(totalRank, pageable, total);
    }

    private ComparableExpressionBase<?> getRankExpression(String rankValue) {

        if (rankValue != null && rankValue.equals(RELIABILITY)) {
            return analystInfo.reliability.divide(analystBoard.countDistinct()).floor();
//            return analystInfo.reliability;
        } else if (rankValue != null && rankValue.equals(ACCURACY)) {
            return analystInfo.accuracy.divide(analystBoard.countDistinct()).floor();
//            return analystInfo.accuracy;
        }
        return analystInfo.totalAnalystScore;
    }

}
