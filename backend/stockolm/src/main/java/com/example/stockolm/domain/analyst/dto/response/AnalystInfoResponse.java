package com.example.stockolm.domain.analyst.dto.response;

import com.example.stockolm.domain.analyst.dto.IndustryDTO;
import com.example.stockolm.domain.analyst.dto.StockInfoDTO;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AnalystInfoResponse {
    private String userName;
    private String userNickName;
    private int boardSize;
    private int follower;
    private int totalAnalystRank;
    private Double reliability;
    private List<StockInfoDTO> reliabilityStock;
    private Double accuracy;
    private List<StockInfoDTO> accuracyStock;
    private List<IndustryDTO> industry;

    @Builder
    public AnalystInfoResponse(List<IndustryDTO> industry, List<StockInfoDTO> accuracyStock,
                               Double accuracy, List<StockInfoDTO> reliabilityStock,
                               Double reliability, int totalAnalystRank, int follower,
                               int boardSize, String userNickName, String userName) {
        this.industry = industry;
        this.accuracyStock = accuracyStock;
        this.accuracy = accuracy;
        this.reliabilityStock = reliabilityStock;
        this.reliability = reliability;
        this.totalAnalystRank = totalAnalystRank;
        this.follower = follower;
        this.boardSize = boardSize;
        this.userNickName = userNickName;
        this.userName = userName;
    }
}
