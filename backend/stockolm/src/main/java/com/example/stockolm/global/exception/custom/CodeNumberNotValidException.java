package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class CodeNumberNotValidException extends CustomException {
    public CodeNumberNotValidException(){super("인증이 실패했습니다.", HttpStatus.BAD_REQUEST);}
}
