package com.example.stockolm.domain.user.controller;

import com.example.stockolm.domain.user.dto.request.SendMailRequest;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import com.example.stockolm.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Tag(name = "User", description = "사용자 관련 API")
public class UserController {

    private final UserService userService;

    @PostMapping("/send-mail")
    @Operation(summary = "이메일 인증키 발송", description = "회원가입시 이메일 인증보내기")
    public ResponseEntity<?> sendVerificationEmail(@RequestBody SendMailRequest sendMailRequest) throws MessagingException {
        try {
            // 인증 코드 생성 및 이메일 전송
            String verificationCode = userService.generateVerificationCode();
            SendMailResponse response = userService.sendVerificationEmail(sendMailRequest, verificationCode);

            // 성공하면 201 CREATED 반환
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (MessagingException e) {
            // 이메일 전송 실패 시 500 Internal Server Error 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send email: " + e.getMessage());
        }
    }
}
