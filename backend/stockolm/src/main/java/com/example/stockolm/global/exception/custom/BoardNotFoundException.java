package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class BoardNotFoundException extends CustomException {
    public BoardNotFoundException() {
        super("게시글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
    }
}
