package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class LoginRequiredException extends CustomException {
    public LoginRequiredException() {
        super("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
    }
}
