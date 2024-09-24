package com.example.stockolm.global.exception.custom;

import com.example.stockolm.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class StockNotFoundException extends CustomException {
    public StockNotFoundException() { super("해당하는 주식 종목을 찾을 수 없습니다.", HttpStatus.NOT_FOUND); }

}
