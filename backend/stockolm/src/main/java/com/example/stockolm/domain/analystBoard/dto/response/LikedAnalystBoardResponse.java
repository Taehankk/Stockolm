package com.example.stockolm.domain.analystBoard.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LikedAnalystBoardResponse {
    private Long analystBoardId;
    private String stockName;
    private String title;
    private String userName;
    private String userNickName;
    private String userImagePath;

    @Builder

    public LikedAnalystBoardResponse(Long analystBoardId, String stockName, String title,
                                     String userName, String userNickName, String userImagePath) {
        this.analystBoardId = analystBoardId;
        this.stockName = stockName;
        this.title = title;
        this.userName = userName;
        this.userNickName = userNickName;
        this.userImagePath = userImagePath;
    }
}
