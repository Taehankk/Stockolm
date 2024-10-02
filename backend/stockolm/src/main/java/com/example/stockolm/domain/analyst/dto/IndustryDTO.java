package com.example.stockolm.domain.analyst.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class IndustryDTO {
    private String industryName;
    private Long industryValue;

    @Builder
    public IndustryDTO(String industryName, Long industryValue) {
        this.industryName = industryName;
        this.industryValue = industryValue;
    }
}
