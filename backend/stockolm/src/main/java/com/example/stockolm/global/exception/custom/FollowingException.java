package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class FollowingException extends CustomException {

    public FollowingException() {
        super("자기 자신은 팔로잉 할 수 없습니다.", HttpStatus.BAD_REQUEST);
    }
}
