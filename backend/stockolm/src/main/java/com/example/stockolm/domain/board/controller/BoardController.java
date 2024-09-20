package com.example.stockolm.domain.board.controller;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;
import com.example.stockolm.domain.board.service.BoardService;
import com.example.stockolm.global.auth.AuthPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
@Tag(name = "Board", description = "자유게시판 관련 API")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    @Operation(summary = "글 생성", description = "자유게시판 글 생성 API")
    public ResponseEntity<?> createBoard(@AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody CreateBoardRequest createBoardRequest) {
        boardService.createBoard(userId, createBoardRequest);
        return ResponseEntity.status(CREATED).build();
    }

    @PutMapping("/{boardId}")
    @Operation(summary = "글 수정", description = "자유게시판 글 수정 API")
    public ResponseEntity<?> modifyBoard(@PathVariable Long boardId, @AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody ModifyBoardRequest modifyBoardRequest) {
        boardService.modifyBoard(boardId, userId, modifyBoardRequest);
        return ResponseEntity.status(NO_CONTENT).build();
    }

    @DeleteMapping("/{boardId}")
    @Operation(summary = "글 삭제", description = "자유게시판 글 삭제 API")
    public ResponseEntity<?> removeBoard(@PathVariable Long boardId, @AuthPrincipal @Parameter(hidden = true) Long userId) {
        boardService.removeBoard(boardId, userId);
        return ResponseEntity.status(NO_CONTENT).build();
    }
}
