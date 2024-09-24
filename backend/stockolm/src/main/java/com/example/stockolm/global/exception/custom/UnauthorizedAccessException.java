package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class UnauthorizedAccessException extends CustomException {
    public UnauthorizedAccessException() { super("접근 권한이 없습니다.", HttpStatus.FORBIDDEN); }
}
