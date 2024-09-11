package com.example.stockolm.domain.user.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmailValidationRequest {
    private Long emailAuthId;
    private String randomKey;
}
