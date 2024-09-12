package com.example.stockolm.domain.user.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class SignUpRequest {
    private String userEmail;

    private String userPassword;

    private String userName;

    private String userNickname;

    private String roleType;

    private Long emailAuthId;

}
