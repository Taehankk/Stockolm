package com.example.stockolm.domain.user.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
public class SendMailResponse {

    private Long emailAuthId;

    public SendMailResponse(Long emailAuthId) {
        this.emailAuthId = emailAuthId;
    }
}
