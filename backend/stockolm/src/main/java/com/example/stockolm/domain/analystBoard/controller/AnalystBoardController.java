package com.example.stockolm.domain.analystBoard.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analyst-board")
@Tag(name = "Analyst Board", description = "종목 분석 게시판 관련 API")
public class AnalystBoardController {
}
