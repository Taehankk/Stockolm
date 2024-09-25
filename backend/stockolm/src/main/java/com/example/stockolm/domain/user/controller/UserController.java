package com.example.stockolm.domain.user.controller;

import com.example.stockolm.domain.user.dto.request.*;
import com.example.stockolm.domain.user.dto.response.LoginResponse;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import com.example.stockolm.domain.user.dto.response.UserInfoResponse;
import com.example.stockolm.domain.user.service.UserService;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import com.example.stockolm.global.util.jwt.JwtUtil;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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

    private final JwtUtil jwtUtil;

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
                .body(new LoginResponse(loginResponse.getUserId()));
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "로그아웃 API")
    public ResponseEntity<?> logout(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null || !jwtUtil.checkRefreshToken(refreshToken)) {
            return ResponseEntity.status(UNAUTHORIZED).body("리프레시 토큰을 확인할 수 없음");
        }

        Long userId = jwtUtil.getUserIdByRefreshToken(refreshToken);
        if (userId != null) {
            userService.deleteRefreshToken(userId);
        }

        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0) // 쿠키 삭제
                .build();

        return ResponseEntity.status(OK)
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .build();
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

    @PostMapping("/refresh-token")
    @Operation(summary = "AccessToken 재발급", description = "AccessToken 재발급 API")
    public ResponseEntity<?> refreshAccessToken(@CookieValue(value = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null || !jwtUtil.checkRefreshToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        Long userId = jwtUtil.getUserIdByRefreshToken(refreshToken);
        if (userId == null || !userService.isRefreshTokenValid(userId, refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        String newAccessToken = jwtUtil.createAccessToken(userId);

        return ResponseEntity.status(OK)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + newAccessToken)
                .body(new LoginResponse(userId));
    }

    @PatchMapping("/password")
    @Operation(summary = "비 로그인시 비밀번호 변경", description = "비 로그인시 비밀번호 변경 API")
    public ResponseEntity<?> updatePassword(@RequestBody FindPasswordRequest findPasswordRequest) {
        userService.updatePassword(findPasswordRequest);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @GetMapping("/info")
    @Operation(summary = "내 정보 조회", description = "내 정보 조회 API")
    public ResponseEntity<?> myUserInfo(@AuthPrincipal @Parameter(hidden = true) Long userId) {

        if (userId == null) {
            throw new LoginRequiredException();
        }
        UserInfoResponse userInfo = userService.getUserInfo(userId);

        return ResponseEntity.status(OK).body(userInfo);
    }

    @DeleteMapping("/withdraw")
    @Operation(summary = "회원탈퇴", description = "회원탈퇴 API")
    public ResponseEntity<?> withdraw(@AuthPrincipal @Parameter(hidden = true) Long userId) {
        if (userId == null) {
            throw new LoginRequiredException();
        }

        userService.withdraw(userId);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @PatchMapping("/nickname")
    @Operation(summary = "닉네임 변경", description = "닉네임 변경 API")
    public ResponseEntity<?> updateNickname(@AuthPrincipal @Parameter(hidden = true) Long userId, @RequestBody NicknameUpdateRequest nicknameUpdateRequest) {
        if (userId == null) {
            throw new LoginRequiredException();
        }

        userService.modifyUserNickname(userId,nicknameUpdateRequest);

        return ResponseEntity.status(NO_CONTENT).build();

    }

    @PatchMapping("/update-password")
    @Operation(summary = "로그인 시 비밀번호 변경", description = "로그인 시 비밀번호 변경 API")
    public ResponseEntity<?> updatePassword(@AuthPrincipal @Parameter(hidden = true) Long userId,
                                            @RequestBody PasswordUpdateRequest passwordUpdateRequest){
        if (userId == null) {
            throw new LoginRequiredException();
        }

        userService.updateNewPassword(userId,passwordUpdateRequest);

        return ResponseEntity.status(NO_CONTENT).build();
    }

    @PostMapping("/follow")
    @Operation(summary = "애널리스트 팔로우", description = "애널리스트 팔로우 API")
    public ResponseEntity<?> followAnalyst(@AuthPrincipal @Parameter(hidden = true)Long userId,
                                           @RequestBody FollowRequest followRequest){
        if(userId == null){
            throw new LoginRequiredException();
        }

        userService.followAnalyst(userId,followRequest);

        return ResponseEntity.status(NO_CONTENT).build();
    }

}

