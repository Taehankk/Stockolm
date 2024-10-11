package com.example.stockolm.domain.analystBoard.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AnalystBoardResponse {
    private String stockName;
    private String title;
    private String userName;
    private String userNickName;
    private String userImagePath;

    private String opinion;            // 투자 의견
    private int goalStock;             // 목표 주가
    private int currentStock;          // 현재 주가
    private Long marketCapitalization; // 시가총액
    private String content;            // 리포트 요약내용
    private String filePath;           // AWS S3 서버 내 리포트 파일 경로
    private int likeCnt;
    private int viewCnt;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private boolean isLike;

    @Builder
    public AnalystBoardResponse(String stockName, String title, String userName, String userNickName, String userImagePath, String opinion, int goalStock, int currentStock, Long marketCapitalization, String content, String filePath, int likeCnt, int viewCnt, LocalDateTime createAt, LocalDateTime updateAt, boolean isLike) {
        this.stockName = stockName;
        this.title = title;
        this.userName = userName;
        this.userNickName = userNickName;
        this.userImagePath = userImagePath;
        this.opinion = opinion;
        this.goalStock = goalStock;
        this.currentStock = currentStock;
        this.marketCapitalization = marketCapitalization;
        this.content = content;
        this.filePath = filePath;
        this.likeCnt = likeCnt;
        this.viewCnt = viewCnt;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.isLike = isLike;
    }
}
