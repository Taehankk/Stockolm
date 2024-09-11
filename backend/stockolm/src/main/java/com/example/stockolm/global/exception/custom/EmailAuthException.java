package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class EmailAuthException extends CustomException {
    public EmailAuthException(){super("이메일 인증 값이 유효하지 않습니다.", HttpStatus.BAD_REQUEST);}
}
