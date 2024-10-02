package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class CommentNotFoundException extends CustomException {
    public CommentNotFoundException() {
        super("댓글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
    }
}
