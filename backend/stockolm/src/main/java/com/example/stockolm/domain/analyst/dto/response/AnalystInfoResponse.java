package com.example.stockolm.domain.analyst.dto.response;

import com.example.stockolm.domain.analyst.dto.IndustryDTO;
import com.example.stockolm.domain.analyst.dto.StockInfoDTO;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AnalystInfoResponse {
    private int boardSize;
    private int follower;
    private int totalAnalystRank;
    private Double reliability;
    private List<StockInfoDTO> reliabilityStock;
    private Double accuracy;
    private List<StockInfoDTO> accuracyStock;
    private List<IndustryDTO> industry;

    @Builder

    public AnalystInfoResponse(int boardSize, int follower, int totalAnalystRank,
                               Double reliability, List<StockInfoDTO> reliabilityStock, Double accuracy,
                               List<StockInfoDTO> accuracyStock, List<IndustryDTO> industry) {
        this.boardSize = boardSize;
        this.follower = follower;
        this.totalAnalystRank = totalAnalystRank;
        this.reliability = reliability;
        this.reliabilityStock = reliabilityStock;
        this.accuracy = accuracy;
        this.accuracyStock = accuracyStock;
        this.industry = industry;
    }
}
