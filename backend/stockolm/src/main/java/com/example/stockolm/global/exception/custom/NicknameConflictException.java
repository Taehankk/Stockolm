package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class NicknameConflictException extends CustomException {
    public NicknameConflictException() { super("닉네임이 이미 존재합니다", HttpStatus.CONFLICT); }
}
