package com.example.stockolm.domain.user.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AuthCodeRequest {
    private String codeNumber;
}
