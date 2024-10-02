package com.example.stockolm.domain.analyst.controller;


import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;
import com.example.stockolm.domain.analyst.service.AnalystService;
import com.example.stockolm.domain.rank.dto.response.AnalystRankInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/analyst")
@Tag(name = "Analyst", description = "애널리스트 관련 API")
public class AnalystController {

    private final AnalystService analystService;

    @GetMapping("/{user-nickname}")
    @Operation(summary = "애널리스트 정보 조회", description = "애널리스트 정보 조회 API")
    public ResponseEntity<?> searchAnalystInfo(@RequestParam("user-nickname") String analystNickName) {

        AnalystInfoResponse analystInfoResponse = analystService.searchAnalystInfo(analystNickName);

        return ResponseEntity.status(OK).body(analystInfoResponse);
    }

}
