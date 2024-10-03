package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GetChartResponse {

    private final String stck_bsop_date;

    private final String stck_cntg_hour;

    private final String acml_tr_pbmn;

    private final String stck_prpr;

    private final String stck_oprc;

    private final String stck_hgpr;

    private final String stck_lwpr;

    @Builder
    public GetChartResponse(String stck_bsop_date, String stck_cntg_hour, String acml_tr_pbmn, String stck_prpr, String stck_oprc, String stck_hgpr, String stck_lwpr) {
        this.stck_bsop_date = stck_bsop_date;
        this.stck_cntg_hour = stck_cntg_hour;
        this.acml_tr_pbmn = acml_tr_pbmn;
        this.stck_prpr = stck_prpr;
        this.stck_oprc = stck_oprc;
        this.stck_hgpr = stck_hgpr;
        this.stck_lwpr = stck_lwpr;
    }
}
