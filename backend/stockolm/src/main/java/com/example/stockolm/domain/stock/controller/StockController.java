package com.example.stockolm.domain.stock.controller;

import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.stock.dto.response.*;
import com.example.stockolm.domain.stock.entity.StockInfo;
import com.example.stockolm.domain.stock.service.StockService;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import com.example.stockolm.global.exception.custom.StockNotFoundException;
import com.example.stockolm.global.util.webclient.KoreaInvestWebClientUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Path;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/v1/stock")
@RequiredArgsConstructor
@Tag(name = "Stock", description = "stock 관련 API")
public class StockController {

    private final StockService stockService;
    private final KoreaInvestWebClientUtil koreaInvestWebClientUtil;

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
    public ResponseEntity<SearchStockResponse> searchStock(@AuthPrincipal @Parameter(hidden = true) Long userId,
                                                           @PathVariable("stock-name") String stockName) {

        SearchStockResponse searchStockResponse = stockService.createStockSearchLog(userId, stockName);
        return ResponseEntity.status(CREATED).body(searchStockResponse);
    }

    @GetMapping("/search-result/{search-keyword}")
    @Operation(summary = "종목 검색결과 조회", description = "종목 검색결과 조회 API")
    public ResponseEntity<List<StockSearchResultResponse>> getStockSearchResult(@PathVariable("search-keyword") String searchKeyword) {

        List<StockSearchResultResponse> response = stockService.getStockSearchResult(searchKeyword);

        return ResponseEntity.status(OK).body(response);
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
                                                              @PathVariable("stock-name") String stockName) {


        StockDetailResponse stockDetailResponse = stockService.getStockDetail(userId, stockName);

        return ResponseEntity.status(OK).body(stockDetailResponse);
    }

    @GetMapping("/analyzed-stock")
    @Operation(summary = "분석한 종목 조회", description = "분석한 종목 조회 API")
    public ResponseEntity<?> getAnalyzedStock(@AuthPrincipal @Parameter(hidden = true) Long userId) {
        if (userId == null) {
            throw new LoginRequiredException();
        }

        List<AnalyzedStockResponse> analyzedStockList = stockService.getAnalyzedStockList(userId);

        return ResponseEntity.status(OK).body(analyzedStockList);
    }

    @GetMapping("/stock-info/{stock-code}")
    @Operation(summary = "기업/투자 정보 조회", description = "기업/투자 정보 조회 API")
    public ResponseEntity<?> getStockInfo(@PathVariable("stock-code") String stockCode) {
        if (stockCode == null)
            return ResponseEntity.status(NOT_FOUND).build();

        StockInfo stockInfoResponse = stockService.getStockInfo(stockCode);
        return ResponseEntity.status(OK).body(stockInfoResponse);
    }

    @GetMapping("/rank/{stock-id}")
    @Operation(summary = "해당 종목 BEST 애널리스트 조회", description = "해당 종목 BEST 애널리스트 조회 API")
    public ResponseEntity<?> getBestAnalyst(@PathVariable("stock-id") Long stockId) {
        List<BestAnalystResponse> response = stockService.getBestAnalyst(stockId);

        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping("/time-chart/{stock-code}")
    @Operation(summary = "분봉 차트 조회", description = "분봉 차트 조회 API")
    public Flux<List<GetChartResponse>> getChart(@PathVariable("stock-code") String stockCode) {
        return koreaInvestWebClientUtil.getChart(stockCode);
    }

    @GetMapping("/inquire-price/{stock-code}")
    @Operation(summary = "실시간 시세 조회", description = "실시간 시세 조회 API")
    public Mono<List<StockPriceResponse>> getStockPrice(@PathVariable("stock-code") String stockCode) {
        return koreaInvestWebClientUtil.getStockPrice(stockCode);
    }

    @GetMapping("/follow/{stock-name}")
    @Operation(summary = "종목 페이지 관심종목 등록 여부", description = "종목 페이지 관심종목 등록 여부 API")
    public ResponseEntity<StockIsFollowedResponse> isFollowed(@AuthPrincipal @Parameter(hidden = true) Long userId, @PathVariable("stock-name") String stockName) {

        StockIsFollowedResponse response = stockService.isFollowed(userId, stockName);

        return ResponseEntity.ok().body(response);
    }


}
