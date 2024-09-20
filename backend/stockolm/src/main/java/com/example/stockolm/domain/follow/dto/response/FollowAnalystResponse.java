package com.example.stockolm.domain.follow.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowAnalystResponse {
    private String userName;
    private String userNickName;
    private String userImagePath;
    private float reliability;
    private float accuracy;
    private int totalAnalystRanking;

    @Builder
    public FollowAnalystResponse(String userName, String userNickName, String userImagePath, float reliability, float accuracy, int totalAnalystRanking) {
        this.userName = userName;
        this.userNickName = userNickName;
        this.userImagePath = userImagePath;
        this.reliability = reliability;
        this.accuracy = accuracy;
        this.totalAnalystRanking = totalAnalystRanking;
    }
}

