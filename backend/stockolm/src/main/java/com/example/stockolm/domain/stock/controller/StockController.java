package com.example.stockolm.domain.stock.controller;

import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.dto.response.StockDetailResponse;
import com.example.stockolm.domain.stock.dto.response.StockSearchResponse;
import com.example.stockolm.domain.stock.service.StockService;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/stock")
@RequiredArgsConstructor
@Tag(name = "Stock", description = "stock 관련 API")
public class StockController {

    private final StockService stockService;

    @GetMapping("/follow-stocks")
    @Operation(summary = "관심 종목 조회", description = "관심 종목 조회 API")
    public ResponseEntity<?> getFollowStockList(@AuthPrincipal @Parameter(hidden = true) Long userId) {

        if (userId == null) {
            throw new LoginRequiredException();
        }

        List<FollowStockResponse> followStockList = stockService.getFollowStockList(userId);

        return ResponseEntity.status(OK).body(followStockList);
    }

    @PostMapping("/search/{stock-name}")
    @Operation(summary = "종목 검색기록 생성", description = "종목 검색기록 생성 API")
    public ResponseEntity<Void> searchStock(@AuthPrincipal @Parameter(hidden = true) Long userId,
                                            @PathVariable("stock-name") String stockName) {

        stockService.createStockSearchLog(userId, stockName);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @GetMapping("/search-list")
    @Operation(summary = "주식 종목 최근 검색/ 인기 검색어 조회", description = "주식 종목 최근 검색/ 인기 검색어 조회 API")
    public ResponseEntity<StockSearchResponse> stockSearchList(@AuthPrincipal @Parameter(hidden = true) Long userId) {

        StockSearchResponse stockSearchResponse = stockService.stockSearchList(userId);

        return ResponseEntity.status(OK).body(stockSearchResponse);
    }

    @PostMapping("/follow/{stock-name}")
    @Operation(summary = "관심 종목 등록", description = "관심 종목 등록 API")
    public ResponseEntity<?> followStock(@AuthPrincipal @Parameter(hidden = true) Long userId,
                                         @PathVariable("stock-name") String stockName) {
        if (userId == null) {
            throw new LoginRequiredException();
        }
        stockService.followStock(userId, stockName);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @GetMapping("/{stock-name}")
    @Operation(summary = "검색한 종목 조회", description = "검색한 종목 조회 API")
    public ResponseEntity<StockDetailResponse> getStockDetail(@AuthPrincipal @Parameter(hidden = true) Long userId,
                                                              @PathVariable("stock-name")String stockName){

      StockDetailResponse stockDetailResponse = stockService.getStockDetail(userId,stockName);

        return ResponseEntity.status(OK).body(stockDetailResponse);
    }



}
