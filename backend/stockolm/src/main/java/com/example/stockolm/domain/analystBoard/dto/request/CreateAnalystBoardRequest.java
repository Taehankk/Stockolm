package com.example.stockolm.domain.analystBoard.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CreateAnalystBoardRequest {
    @NotNull
    private String title;

    private String stockName;

    private String industryName;

    private String opinion;

    private int goalStock;             // 목표 주가

    private int currentStock;          // 현재 주가

    private Long marketCapitalization; // 시가총액

    private String content;            // 리포트 요약내용

    private LocalDate goalDate;    // 목표 날짜

    private String filePath;        // 리포트 파일 주소
}
