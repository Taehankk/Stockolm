package com.example.stockolm.domain.user.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FindPasswordResponse {
    private Long emailAuthId;

    public FindPasswordResponse(Long emailAuthId) {
        this.emailAuthId = emailAuthId;
    }
}
