package com.example.stockolm.domain.stock.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StockIsFollowedResponse {
    private Boolean isFollowed;

    @Builder
    public StockIsFollowedResponse(Boolean isFollowed) {
        this.isFollowed = isFollowed;
    }
}
