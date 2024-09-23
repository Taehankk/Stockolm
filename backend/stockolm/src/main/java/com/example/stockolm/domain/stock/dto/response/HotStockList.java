package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class HotStockList {
   private String hotStockCode;
   private String hotStockName;

   @Builder
    public HotStockList(String hotStockCode, String hotStockName) {
       this.hotStockCode = hotStockCode;
       this.hotStockName = hotStockName;
   }
}
