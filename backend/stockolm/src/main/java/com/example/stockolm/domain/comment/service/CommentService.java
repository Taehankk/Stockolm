package com.example.stockolm.domain.comment.service;

import com.example.stockolm.domain.comment.dto.request.CreateCommentRequest;
import com.example.stockolm.domain.comment.dto.request.ModifyCommentRequest;
import com.example.stockolm.domain.comment.dto.response.CommentResponse;

import java.util.List;

public interface CommentService {
    List<CommentResponse> getCommentList(Long boardId);

    void createComment(Long boardId, Long userId, CreateCommentRequest createCommentRequest);

    void modifyComment(Long commentId, Long userId, ModifyCommentRequest modifyCommentRequest);

    void removeComment(Long commentId, Long userId);
}
