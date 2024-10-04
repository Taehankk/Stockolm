package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GetChartResponse {

    private final String stckBsopDate;

    private final String stckCntgHour;

    private final String acmlTrPbmn;

    private final String stckPrpr;

    private final String stckOprc;

    private final String stckHgpr;

    private final String stckLwpr;

    @Builder
    public GetChartResponse(String stckBsopDate, String stckCntgHour, String acmlTrPbmn, String stckPrpr, String stckOprc, String stckHgpr, String stckLwpr) {
        this.stckBsopDate = stckBsopDate;
        this.stckCntgHour = stckCntgHour;
        this.acmlTrPbmn = acmlTrPbmn;
        this.stckPrpr = stckPrpr;
        this.stckOprc = stckOprc;
        this.stckHgpr = stckHgpr;
        this.stckLwpr = stckLwpr;
    }
}
