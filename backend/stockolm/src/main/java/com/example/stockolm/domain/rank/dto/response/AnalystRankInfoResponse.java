package com.example.stockolm.domain.rank.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnalystRankInfoResponse {
    private String userName;
    private String userNickname;
    private String userImagePath;
    private int totalAnalystRanking;
    private Long totalBoardSize;
    private Double reliability;
    private Double accuracy;

    @Builder
    public AnalystRankInfoResponse(String userName, String userNickname,
                                   String userImagePath, int totalAnalystRanking,
                                   Long totalBoardSize, Double reliability,
                                   Double accuracy) {
        this.userName = userName;
        this.userNickname = userNickname;
        this.userImagePath = userImagePath;
        this.totalAnalystRanking = totalAnalystRanking;
        this.totalBoardSize = totalBoardSize;
        this.reliability = reliability;
        this.accuracy = accuracy;
    }
}
