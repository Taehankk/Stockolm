package com.example.stockolm.domain.stock.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class BestAnalystResponse {
    private String analystName;

    private String analystNickname;

    private String userImagePath;

    private Double reliability;

    private Double accuracy;

    private Long analystBoardId;

    private LocalDate goalDate;

    private String opinion;

    private Integer goalStock;


    public BestAnalystResponse(Long analystBoardId, LocalDate goalDate, String opinion, Integer goalStock, Double reliability, Double accuracy, String analystName, String userImagePath, String analystNickname) {
        this.analystBoardId = analystBoardId;
        this.goalDate = goalDate;
        this.opinion = opinion;
        this.goalStock = goalStock;
        this.reliability = reliability;
        this.accuracy = accuracy;
        this.analystName = analystName;
        this.userImagePath = userImagePath;
        this.analystNickname = analystNickname;
    }
}
