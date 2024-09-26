package com.example.stockolm.domain.analystBoard.controller;

import com.example.stockolm.domain.analystBoard.dto.request.CreateAnalystBoardRequest;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.service.AnalystBoardService;
import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
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

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/analyst-board")
@Tag(name = "Analyst Board", description = "종목 분석 게시판 관련 API")
public class AnalystBoardController {

    private final AnalystBoardService analystBoardService;

    public void validateLogin(Long userId) {
        if (userId == null) {
            throw new LoginRequiredException();
        }
    }

    @GetMapping("/like/{userId}")
    @Operation(summary = "내가 좋아요한 분석글 조회", description = "내가 좋아요한 분석글 조회 API")
    public ResponseEntity<?> getLikedAnalystBoard(@AuthPrincipal @Parameter(hidden = true) Long userId,
                                                  @RequestParam(required = false) String stockName) {
        validateLogin(userId);

        List<AnalystBoardResponse> likedAnalystBoardList = analystBoardService.getLikedAnalystBoard(userId, stockName);

        return ResponseEntity.status(OK).body(likedAnalystBoardList);
    }

    @PatchMapping("/main-content/{analystBoardId}")
    @Operation(summary = "대표글 설정", description = "대표글 설정 API")
    public ResponseEntity<?> setMainContent(
            @AuthPrincipal @Parameter(hidden = true) Long userId,
            @PathVariable Long analystBoardId) {
        validateLogin(userId);

        analystBoardService.setMainContent(userId, analystBoardId);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @PostMapping
    @Operation(summary = "글 생성", description = "종목게시판 글 생성 API")
    public ResponseEntity<Void> createAnalystBoard(@AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody CreateAnalystBoardRequest createAnalystBoardRequest) {
        validateLogin(userId);
        analystBoardService.createAnalystBoard(userId, createAnalystBoardRequest);
        return ResponseEntity.status(CREATED).build();
    }

}
