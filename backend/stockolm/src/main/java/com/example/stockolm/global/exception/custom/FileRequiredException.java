package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class FileRequiredException extends CustomException {
    public FileRequiredException() {
        super("파일이 올바르게 제공되지 않았습니다.", HttpStatus.BAD_REQUEST);
    }
}
