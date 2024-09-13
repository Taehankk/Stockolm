package com.example.stockolm.domain.user.service;

import com.example.stockolm.domain.user.dto.request.AuthCodeRequest;
import com.example.stockolm.domain.user.dto.request.EmailValidationRequest;
import com.example.stockolm.domain.user.dto.request.NicknameExistsRequest;
import com.example.stockolm.domain.user.dto.request.SendMailRequest;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import jakarta.mail.MessagingException;

public interface UserService {
    String generateVerificationCode();

    SendMailResponse sendVerificationEmail(SendMailRequest sendMailRequest, String verificationCode) throws MessagingException;

    void verificationCode(EmailValidationRequest emailValidationRequest);

    void verificationAnalyst(AuthCodeRequest authCodeRequest);

    void checkNickname(NicknameExistsRequest nicknameExistsRequest);
}