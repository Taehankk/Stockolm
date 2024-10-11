package com.example.stockolm.domain.comment.controller;

import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;
import com.example.stockolm.domain.board.dto.response.BoardPageResponse;
import com.example.stockolm.domain.comment.dto.request.CreateCommentRequest;
import com.example.stockolm.domain.comment.dto.request.ModifyCommentRequest;
import com.example.stockolm.domain.comment.dto.response.CommentResponse;
import com.example.stockolm.domain.comment.service.CommentService;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
@Tag(name = "Comment", description = "자유게시판 글에 대한 댓글 관련 API")
public class CommentContoller {

    private final CommentService commentService;

    public void validateLogin(Long userId) {
        if (userId == null) {
            throw new LoginRequiredException();
        }
    }

    @GetMapping("/{boardId}")
    @Operation(summary = "댓글 목록 조회", description = "특정 자유게시판 글에 달린 댓글 목록을 조회하는 API")
    public ResponseEntity<List<CommentResponse>> getCommentList(@PathVariable Long boardId) {
        // 로그인 없이 댓글 목록 조회 가능
        List<CommentResponse> commentList = commentService.getCommentList(boardId);
        return ResponseEntity.status(OK).body(commentList);
    }


    @PostMapping("/{boardId}")
    @Operation(summary = "댓글 생성", description = "자유게시판 글에 댓글 작성하는 API")
    public ResponseEntity<Void> createComment(@PathVariable Long boardId, @AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody CreateCommentRequest createCommentRequest) {
        validateLogin(userId);
        commentService.createComment(boardId, userId, createCommentRequest);
        return ResponseEntity.status(CREATED).build();
    }

    @PutMapping("/{commentId}")
    @Operation(summary = "댓글 수정", description = "댓글 수정 API")
    public ResponseEntity<Void> modifyComment(@PathVariable Long commentId, @AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody ModifyCommentRequest modifyCommentRequest) {
        validateLogin(userId);
        commentService.modifyComment(commentId, userId, modifyCommentRequest);
        return ResponseEntity.status(NO_CONTENT).build();
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "댓글 삭제", description = "댓글 삭제 API")
    public ResponseEntity<Void> removeComment(@PathVariable Long commentId, @AuthPrincipal @Parameter(hidden = true) Long userId) {
        validateLogin(userId);
        commentService.removeComment(commentId, userId);
        return ResponseEntity.status(NO_CONTENT).build();
    }

}
