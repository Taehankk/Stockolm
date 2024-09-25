package com.example.stockolm.domain.board.controller;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;
import com.example.stockolm.domain.board.dto.response.BoardResponse;
import com.example.stockolm.domain.board.service.BoardService;
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
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
@Tag(name = "Board", description = "자유게시판 관련 API")
public class BoardController {

    private final BoardService boardService;

    public void validateLogin(Long userId) {
        if (userId == null) {
            throw new LoginRequiredException();
        }
    }

    @PostMapping
    @Operation(summary = "글 생성", description = "자유게시판 글 생성 API")
    public ResponseEntity<Void> createBoard(@AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody CreateBoardRequest createBoardRequest) {
        validateLogin(userId);
        boardService.createBoard(userId, createBoardRequest);
        return ResponseEntity.status(CREATED).build();
    }

    @PutMapping("/{boardId}")
    @Operation(summary = "글 수정", description = "자유게시판 글 수정 API")
    public ResponseEntity<Void> modifyBoard(@PathVariable Long boardId, @AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody ModifyBoardRequest modifyBoardRequest) {
        validateLogin(userId);
        boardService.modifyBoard(boardId, userId, modifyBoardRequest);
        return ResponseEntity.status(NO_CONTENT).build();
    }

    @DeleteMapping("/{boardId}")
    @Operation(summary = "글 삭제", description = "자유게시판 글 삭제 API")
    public ResponseEntity<Void> removeBoard(@PathVariable Long boardId, @AuthPrincipal @Parameter(hidden = true) Long userId) {
        validateLogin(userId);
        boardService.removeBoard(boardId, userId);
        return ResponseEntity.status(NO_CONTENT).build();
    }

    @GetMapping("/{boardId}")
    @Operation(summary = "글 상세 조회", description = "자유게시판 글 상세 조회 API")
    public ResponseEntity<BoardResponse> retrieveBoard(@PathVariable Long boardId) {
        // 로그인 없이 글 조회 가능
        BoardResponse boardResponse = boardService.retrieveBoard(boardId);
        return ResponseEntity.status(OK).body(boardResponse);
    }

    @PostMapping("/like/{boardId}")
    @Operation(summary = "글 좋아요", description = "자유게시판 글 좋아요 API")
    public ResponseEntity<Void> likeBoard(@PathVariable Long boardId, @AuthPrincipal @Parameter(hidden = true) Long userId) {
        validateLogin(userId);
        boardService.likeBoard(boardId, userId);
        return ResponseEntity.status(NO_CONTENT).build();
    }
}
