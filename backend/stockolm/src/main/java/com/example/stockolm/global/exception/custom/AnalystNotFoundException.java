package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class AnalystNotFoundException extends CustomException {
    public AnalystNotFoundException() {super("해당 애널리스트가 존재하지 않습니다.", HttpStatus.NOT_FOUND);}
}
