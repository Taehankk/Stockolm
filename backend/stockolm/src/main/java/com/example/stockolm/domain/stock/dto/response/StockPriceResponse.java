package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StockPriceResponse {
    private String stckPrpr;

    private String prdyVrss;

    private String prdyCtrt;

    private String acmlVol;

    private String acmlTrPbmn;

    private String stckHgpr;

    private String stckLwpr;


    @Builder
    public StockPriceResponse(String stckPrpr, String prdyVrss, String prdyCtrt, String acmlVol, String acmlTrPbmn, String stckHgpr, String stckLwpr) {
        this.stckPrpr = stckPrpr;
        this.prdyVrss = prdyVrss;
        this.prdyCtrt = prdyCtrt;
        this.acmlVol = acmlVol;
        this.acmlTrPbmn = acmlTrPbmn;
        this.stckHgpr = stckHgpr;
        this.stckLwpr = stckLwpr;
    }
}
