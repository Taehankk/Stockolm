package com.example.stockolm.domain.analyst.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AnalystSimpleInfoResponse {

    private String analystName;
    private String analystNickName;

    @Builder
    public AnalystSimpleInfoResponse(String analystName, String analystNickName) {
        this.analystName = analystName;
        this.analystNickName = analystNickName;
    }
}
