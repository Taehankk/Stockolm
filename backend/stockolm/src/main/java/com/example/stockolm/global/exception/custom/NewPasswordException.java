package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class NewPasswordException extends CustomException {
    public NewPasswordException() {
        super("사용했던 비밀번호와 동일한 비밀번호입니다.", HttpStatus.BAD_REQUEST);
    }
}
