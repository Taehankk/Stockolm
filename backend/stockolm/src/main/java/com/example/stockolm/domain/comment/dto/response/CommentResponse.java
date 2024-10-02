package com.example.stockolm.domain.comment.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponse {
    private Long userId;
    private String userImagePath;
    private String userNickname;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    public CommentResponse(Long userId, String userImagePath, String userNickname, String content, LocalDateTime createAt, LocalDateTime updateAt) {
        this.userId = userId;
        this.userImagePath = userImagePath;
        this.userNickname = userNickname;
        this.content = content;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}
