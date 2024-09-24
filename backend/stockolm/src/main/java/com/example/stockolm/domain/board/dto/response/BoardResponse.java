package com.example.stockolm.domain.board.dto.response;

import com.example.stockolm.domain.board.entity.Comment;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class BoardResponse {
    private String userNickname;
    private String userImagePath; // 프로필 이미지의 S3 경로
    private String title;
    private String content;
    private String category;
    private List<String> imagePathList; // 게시글 첨부 이미지들의 S3 경로
    private int viewCnt;
    private int likeCnt;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private boolean isLike;
    private List<Comment> commentList;

    @Builder
    public BoardResponse(String userNickname, String userImagePath, String title, String content, String category,
                                 List<String> imagePathList, int likeCnt, int viewCnt, LocalDateTime createAt, LocalDateTime updateAt, boolean isLike, List<Comment> commentList) {
        this.userNickname = userNickname;
        this.userImagePath = userImagePath;
        this.title = title;
        this.content = content;
        this.category = category;
        this.imagePathList = imagePathList;
        this.viewCnt = viewCnt;
        this.likeCnt = likeCnt;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.isLike = isLike;
        this.commentList = commentList;
    }
}
