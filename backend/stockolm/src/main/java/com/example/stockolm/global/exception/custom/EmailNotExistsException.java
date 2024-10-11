package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class EmailNotExistsException extends CustomException {
    public EmailNotExistsException(){super("해당 이메일이 존재하지 않습니다.", HttpStatus.NOT_FOUND);}

}
