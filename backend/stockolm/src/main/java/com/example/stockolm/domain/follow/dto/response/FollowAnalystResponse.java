package com.example.stockolm.domain.follow.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowAnalystResponse {
    private String userName;
    private String userNickName;
    private String userImagePath;
    private Long reliability;
    private Long accuracy;
    private Integer totalAnalystRanking;

    @Builder
    public FollowAnalystResponse(String userName, String userNickName, String userImagePath,
                                 Long reliability, Long accuracy, Integer totalAnalystRanking) {
        this.userName = userName;
        this.userNickName = userNickName;
        this.userImagePath = userImagePath;
        this.reliability = reliability;
        this.accuracy = accuracy;
        this.totalAnalystRanking = totalAnalystRanking;
    }
}

