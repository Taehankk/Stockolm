package com.example.stockolm.domain.user.service;

import com.example.stockolm.domain.user.dto.request.*;
import com.example.stockolm.domain.user.dto.response.FindPasswordResponse;
import com.example.stockolm.domain.user.dto.response.LoginResponse;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import com.example.stockolm.domain.user.dto.response.UserInfoResponse;
import com.example.stockolm.domain.user.entity.User;
import jakarta.mail.MessagingException;

public interface UserService {
    String generateVerificationCode();

    SendMailResponse sendVerificationEmail(SendMailRequest sendMailRequest, String verificationCode) throws MessagingException;

    void verificationCode(EmailValidationRequest emailValidationRequest);

    void verificationAnalyst(AuthCodeRequest authCodeRequest);

    void checkNickname(NicknameExistsRequest nicknameExistsRequest);

    void signUp(SignUpRequest signUpRequest);

    LoginResponse login(LoginRequest loginRequest);

    Long authenticateUser(LoginRequest loginRequest);

    void saveRefreshToken(Long userId, String refreshToken);

    boolean isRefreshTokenValid(Long userId, String refreshToken);

    void updatePassword(FindPasswordRequest findPasswordRequest);

    void deleteRefreshToken(Long userId);

    UserInfoResponse getUserInfo(Long userId);

    void withdraw(Long userId);

    void modifyUserNickname(Long userId, NicknameUpdateRequest nicknameUpdateRequest);

    void updateNewPassword(Long userId, PasswordUpdateRequest passwordUpdateRequest);

    void followAnalyst(Long userId, FollowRequest followRequest);

    String getRoleType(Long userId);

    FindPasswordResponse findPassword(FindMailRequest findMailRequest, String verificationCode) throws MessagingException;

    void modifyUserImagePath(String filePath, Long userId);
}
