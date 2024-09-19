package com.example.stockolm.domain.board.controller;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
@Tag(name = "Board", description = "자유게시판 관련 API")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    @Operation(summary = "글 생성", description = "자유게시판 글 생성")
    public ResponseEntity<?> createBoard(/*@AuthPrincipal*/ @RequestParam Long userId, @RequestBody CreateBoardRequest createBoardRequest) {
        boardService.createBoard(userId, createBoardRequest);
        return ResponseEntity.status(CREATED).build();
    }

}




