package com.example.stockolm.domain.user.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class NicknameExistsRequest {
    String userNickname;
}
