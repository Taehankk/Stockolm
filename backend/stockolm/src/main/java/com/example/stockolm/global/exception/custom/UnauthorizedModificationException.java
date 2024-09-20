package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class UnauthorizedModificationException extends CustomException {
    public UnauthorizedModificationException() { super("수정 권한이 없습니다.", HttpStatus.FORBIDDEN); }
}
