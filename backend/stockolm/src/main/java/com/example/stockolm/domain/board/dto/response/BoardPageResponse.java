package com.example.stockolm.domain.board.dto.response;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoardPageResponse {
    private String userNickname;
    private String userImagePath; // 프로필 이미지의 S3 경로
    private Long boardId;
    private String title;
    private String category;
    private int viewCnt;
    private int likeCnt;
    private int commentCnt;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private boolean isLike;

    public BoardPageResponse(String userNickname, String userImagePath, Long boardId, String title, String category,
                         int viewCnt, int likeCnt, int commentCnt, LocalDateTime createAt, LocalDateTime updateAt, boolean isLike) {
        this.userNickname = userNickname;
        this.userImagePath = userImagePath;
        this.boardId = boardId;
        this.title = title;
        this.category = category;
        this.viewCnt = viewCnt;
        this.likeCnt = likeCnt;
        this.commentCnt = commentCnt;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.isLike = isLike;
    }
}