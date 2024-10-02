package com.example.stockolm.domain.analyst.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AnalystGoalInfoDTO {

    public Double reliability;
    public Double accuracy;

    public void initReliability() {
        this.reliability = 0.0;
    }

    public void initAccuracy() {
        this.accuracy = 0.0;
    }

    @Builder
    public AnalystGoalInfoDTO(Double reliability, Double accuracy) {
        this.reliability = reliability;
        this.accuracy = accuracy;
    }
}
