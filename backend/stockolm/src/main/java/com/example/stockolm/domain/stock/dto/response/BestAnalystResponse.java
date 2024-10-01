package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class BestAnalystResponse {
    private String analystName;

    private String userImagePath;

    private Float reliability;

    private Float accuracy;

    private Long analystBoardId;

    private LocalDate goalDate;

    private String opinion;

    private Integer goalStock;

    @Builder
    public BestAnalystResponse(String analystName, String userImagePath, Float reliability, Float accuracy, Long analystBoardId, LocalDate goalDate, String opinion, Integer goalStock) {
        this.analystName = analystName;
        this.userImagePath = userImagePath;
        this.reliability = reliability;
        this.accuracy = accuracy;
        this.analystBoardId = analystBoardId;
        this.goalDate = goalDate;
        this.opinion = opinion;
        this.goalStock = goalStock;
    }

    public BestAnalystResponse(Long analystBoardId, LocalDate goalDate, String opinion, Integer goalStock) {
        this.analystBoardId =  analystBoardId;
        this.goalDate = goalDate;
        this.opinion = opinion;
        this.goalStock = goalStock;
    }
}
