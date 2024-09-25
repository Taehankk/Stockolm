package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class AnalystSignUpException extends CustomException {
    public AnalystSignUpException(){super("애널리스트는 실명을 입력해야 합니다.", HttpStatus.BAD_REQUEST);}

}
