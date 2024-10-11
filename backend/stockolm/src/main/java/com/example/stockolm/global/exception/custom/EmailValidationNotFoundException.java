package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class EmailValidationNotFoundException extends CustomException {

    public EmailValidationNotFoundException() {
        super("존재하지 않는 이메일 인증 정보 입니다.", HttpStatus.NOT_FOUND);
    }
}
