package com.example.stockolm.domain.follow.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowAnalystResponse {
    private String userName;
    private String userNickName;
    private String userImagePath;
    private Double reliability;
    private Double accuracy;
    private int totalAnalystRanking;

    @Builder
    public FollowAnalystResponse(String userName, String userNickName, String userImagePath, Double reliability, Double accuracy, int totalAnalystRanking) {
        this.userName = userName;
        this.userNickName = userNickName;
        this.userImagePath = userImagePath;
        this.reliability = reliability;
        this.accuracy = accuracy;
        this.totalAnalystRanking = totalAnalystRanking;
    }
}

