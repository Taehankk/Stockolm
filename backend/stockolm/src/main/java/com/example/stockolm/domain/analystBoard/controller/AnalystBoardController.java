package com.example.stockolm.domain.analystBoard.controller;

import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.service.AnalystBoardService;
import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/analyst-board")
@Tag(name = "Analyst Board", description = "종목 분석 게시판 관련 API")
public class AnalystBoardController {

    private final AnalystBoardService analystBoardService;

    @GetMapping("/like/{userId}")
    @Operation(summary = "내가 좋아요한 분석글 조회", description = "내가 좋아요한 분석글 조회 API")
    public ResponseEntity<?> getLikedAnalystBoard(@AuthPrincipal @Parameter(hidden = true) Long userId,
                                                  @RequestParam(required = false) String stockName) {
        if (userId == null) {
            throw new LoginRequiredException();
        }

        List<AnalystBoardResponse> likedAnalystBoardList = analystBoardService.getLikedAnalystBoard(userId, stockName);

        return ResponseEntity.status(OK).body(likedAnalystBoardList);
    }

    @PatchMapping("/main-content/{analystBoardId}")
    @Operation(summary = "대표글 설정", description = "대표글 설정 API")
    public ResponseEntity<?> setMainContent(
            @AuthPrincipal @Parameter(hidden = true) Long userId,
            @PathVariable Long analystBoardId) {
        if (userId == null) {
            throw new LoginRequiredException();
        }

        analystBoardService.setMainContent(userId, analystBoardId);

        return ResponseEntity.status(NO_CONTENT).build();
    }


}
