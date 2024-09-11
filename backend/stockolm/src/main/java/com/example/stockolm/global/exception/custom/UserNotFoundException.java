package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends CustomException {
    public UserNotFoundException() {
        super("존재하지 않는 유저입니다.", HttpStatus.NOT_FOUND);
    }
}
