package com.example.stockolm.domain.user.service;

import com.example.stockolm.domain.user.dto.request.*;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import jakarta.mail.MessagingException;

public interface UserService {
    String generateVerificationCode();

    SendMailResponse sendVerificationEmail(SendMailRequest sendMailRequest, String verificationCode) throws MessagingException;

    void verificationCode(EmailValidationRequest emailValidationRequest);

    void verificationAnalyst(AuthCodeRequest authCodeRequest);

    void checkNickname(NicknameExistsRequest nicknameExistsRequest);

    void signUp(SignUpRequest signUpRequest);
}
