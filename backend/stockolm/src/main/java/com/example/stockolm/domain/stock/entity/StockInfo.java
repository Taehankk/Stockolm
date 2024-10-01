package com.example.stockolm.domain.stock.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StockInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockInfoId;

    private String corpCode;

    private String corpName;

    private String stockCode;

    private String ceoName;

    private String address;

    private String url;

    private String phoneNumber;

    private String faxNumber;

    private String cpta;

    private String papr;

    private String bps;

    private String eps;

    private String roeVal;

    private String ntinInrt;

    private String bsopPrfiInrt;

    private String grs;

    @Builder
    public StockInfo(String corpCode, String cpta, String papr, String bps, String eps, String roeVal, String ntinInt, String bsopPrfiInt, String grs){
        this.corpCode = corpCode;
        this.corpName = corpCode;
        this.stockCode = corpCode;
        this.ceoName = corpCode;
        this.address = corpCode;
        this.url = corpCode;
        this.phoneNumber = corpCode;
        this.faxNumber = corpCode;
        this.cpta = corpCode;
        this.papr = corpCode;
        this.bps = corpCode;
        this.eps = corpCode;
        this.roeVal = roeVal;
        this.ntinInrt = ntinInt;
        this.bsopPrfiInrt = bsopPrfiInt;
        this.grs = grs;
    }
}
