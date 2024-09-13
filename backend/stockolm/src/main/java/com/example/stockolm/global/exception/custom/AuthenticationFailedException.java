package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class AuthenticationFailedException extends CustomException {
    public AuthenticationFailedException(){super("이메일 또는 비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);}

}
