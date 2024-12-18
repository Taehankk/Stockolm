package com.example.stockolm.domain.analystBoard.dto.response;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AnalystBoardPageResponse {

    // user 관련
    private String userName;
    private String userNickName;
    private String userImagePath;

    // stock 관련
    private String stockName;
    private String companyImagePath;

    // analystBoard 관련
    private Long analystBoardId;
    private boolean mainContent;
    private String title;
    private int likeCnt;
    private int viewCnt;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private boolean isLike;
    private String filePath;

    public AnalystBoardPageResponse(String userName, String userNickName, String userImagePath,
                                    String stockName, String companyImagePath,
                                    Long analystBoardId, boolean mainContent, String title, int likeCnt, int viewCnt, LocalDateTime createAt, LocalDateTime updateAt, boolean isLike, String filePath) {
        this.userName = userName;
        this.userNickName = userNickName;
        this.userImagePath = userImagePath;
        this.stockName = stockName;
        this.companyImagePath = companyImagePath;
        this.analystBoardId = analystBoardId;
        this.mainContent = mainContent;
        this.title = title;
        this.likeCnt = likeCnt;
        this.viewCnt = viewCnt;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.isLike = isLike;
        this.filePath = filePath;
    }
}
