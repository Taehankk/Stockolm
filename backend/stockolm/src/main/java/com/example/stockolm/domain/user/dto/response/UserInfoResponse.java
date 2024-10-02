package com.example.stockolm.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoResponse {

    private String userName;
    private String userNickName;
    private String userImagePath;

}
