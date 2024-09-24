package com.example.stockolm.domain.analystBoard.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AnalystBoardResponse {
    Long analystBoardId;
    String stockName;
    String title;
    String userName;
    String userNickName;
    String filePath;

    @Builder
    public AnalystBoardResponse(Long analystBoardId, String stockName, String title,
                                String userName, String userNickName, String filePath) {
        this.analystBoardId = analystBoardId;
        this.stockName = stockName;
        this.title = title;
        this.userName = userName;
        this.userNickName = userNickName;
        this.filePath = filePath;
    }
}
