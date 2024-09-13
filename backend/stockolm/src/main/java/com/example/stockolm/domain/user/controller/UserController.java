package com.example.stockolm.domain.user.controller;

import com.example.stockolm.domain.user.dto.request.*;
import com.example.stockolm.domain.user.dto.response.LoginResponse;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import com.example.stockolm.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Tag(name = "User", description = "사용자 관련 API")
public class UserController {

    @Value("${jwt.refresh-token.expiretime}")
    private long refreshTokenExpireTime;

    private final UserService userService;

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "로그인 API")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        // Service에 로그인 처리 로직을 위임
        LoginResponse loginResponse = userService.login(loginRequest);

        // Refresh Token Cookie 생성
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", loginResponse.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpireTime)
                .sameSite("None")
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + loginResponse.getAccessToken())
                .body(loginResponse);
    }


    @PostMapping("/sign-up")
    @Operation(summary = "회원가입", description = "회원가입 API")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        userService.signUp(signUpRequest);
        return ResponseEntity.status(CREATED).build();
    }

    @PostMapping("/nickname")
    @Operation(summary = "회원가입시 닉네임 중복 확인", description = "닉네임 중복확인 API")
    public ResponseEntity<?> checkNickname(@RequestBody NicknameExistsRequest nicknameExistsRequest) {
        userService.checkNickname(nicknameExistsRequest);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @PostMapping("/send-mail")
    @Operation(summary = "이메일 인증키 발송", description = "회원가입시 이메일 인증보내기 API")
    public ResponseEntity<?> sendEmail(@RequestBody SendMailRequest sendMailRequest) throws MessagingException {
        // 인증 코드 생성 및 이메일 전송
        String verificationCode = userService.generateVerificationCode();
        SendMailResponse response = userService.sendVerificationEmail(sendMailRequest, verificationCode);

        return ResponseEntity.status(CREATED).body(response);
    }

    @PostMapping("/send-mail/validation")
    @Operation(summary = "이메일 인증 확인", description = "이메일 인증 확인 API")
    public ResponseEntity<?> verificationEmail(@RequestBody EmailValidationRequest emailValidationRequest) {

        userService.verificationCode(emailValidationRequest);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @PostMapping("/auth-code")
    @Operation(summary = "애널리스트 인증 확인", description = "애널리스트 인증 코드 확인 API")
    public ResponseEntity<?> verificationAnalyst(@RequestBody AuthCodeRequest authCodeRequest) {
        userService.verificationAnalyst(authCodeRequest);

        return ResponseEntity.status(NO_CONTENT).build();
    }
}

