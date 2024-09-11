package com.example.stockolm.domain.user.service;

import com.example.stockolm.domain.user.dto.request.SendMailRequest;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import jakarta.mail.MessagingException;

public interface UserService {
    String generateVerificationCode();

    SendMailResponse sendVerificationEmail(SendMailRequest sendMailRequest, String verificationCode) throws MessagingException;
}
