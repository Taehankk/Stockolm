package com.example.stockolm.domain.rank.controller;

import com.example.stockolm.domain.rank.dto.response.AnalystRankInfoResponse;
import com.example.stockolm.domain.rank.service.RankService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rank")
@Tag(name = "Rank", description = "랭킹 관련 API")
public class RankController {

    private final RankService rankService;

    @GetMapping()
    @Operation(summary = "랭킹 조회", description = "(전체, 신뢰도, 정확도) 랭킹 조회 API")
    public ResponseEntity<Page<AnalystRankInfoResponse>> getAnalystTotalRank(@RequestParam(required = false) String rankValue,
                                                                             Pageable pageable) {
        Page<AnalystRankInfoResponse> totalRank = rankService.getTotalRank(rankValue, pageable);

        return ResponseEntity.status(OK).body(totalRank);
    }

}
