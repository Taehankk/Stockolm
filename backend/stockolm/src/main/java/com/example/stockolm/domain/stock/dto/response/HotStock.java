package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HotStock {
   private String hotStockCode;
   private String hotStockName;

   @Builder
    public HotStock(String hotStockCode, String hotStockName) {
       this.hotStockCode = hotStockCode;
       this.hotStockName = hotStockName;
   }
}
