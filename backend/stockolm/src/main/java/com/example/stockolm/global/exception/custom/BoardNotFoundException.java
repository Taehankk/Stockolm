package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class BoardNotFoundException extends CustomException {
    public BoardNotFoundException() {
        super("존재하지 않는 게시글입니다.", HttpStatus.NOT_FOUND);
    }
}
