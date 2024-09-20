package com.example.stockolm.domain.stock.controller;

import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.service.StockService;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}
