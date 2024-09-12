package com.example.stockolm.domain.user.service;

import com.example.stockolm.domain.user.dto.request.AuthCodeRequest;
import com.example.stockolm.domain.user.dto.request.EmailValidationRequest;
import com.example.stockolm.domain.user.dto.request.NicknameExistsRequest;
import com.example.stockolm.domain.user.dto.request.SendMailRequest;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import com.example.stockolm.domain.user.entity.AnalystCode;
import com.example.stockolm.domain.user.entity.EmailAuth;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.AnalystCodeRepository;
import com.example.stockolm.domain.user.repository.EmailAuthRepository;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JavaMailSender mailSender;

    private final UserRepository userRepository;

    private final EmailAuthRepository emailAuthRepository;

    private final AnalystCodeRepository analystCodeRepository;


    @Override
    public String generateVerificationCode() {
        int length = 6;
        String characters = "SSAFYSTOCKOLMQWER1234A1S2D48DFGUSGD8SDF8AFD";
        Random random = new Random();
        StringBuilder verificationCode = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            verificationCode.append(characters.charAt(random.nextInt(characters.length())));
        }

        return verificationCode.toString();
    }

    @Override
    public SendMailResponse sendVerificationEmail(SendMailRequest sendMailRequest, String verificationCode) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String email = sendMailRequest.getUserEmail();
        if (userRepository.existsByUserEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

        helper.setFrom("stockolm5563@naver.com"); // 보내는 사람 이메일
        helper.setTo(sendMailRequest.getUserEmail());  // 받는 사람 이메일
        helper.setSubject("스톡올름에서 인증코드를 보내드립니다.");  // 이메일 제목
        helper.setText("인증코드는 : " + verificationCode + " 입니다.");  // 이메일 내용

        mailSender.send(message);  // 이메일 전송
        LocalDateTime createAt = LocalDateTime.now();
        EmailAuth emailAuth = emailAuthRepository.save(EmailAuth.builder()
                .randomKey(verificationCode)
                .createAt(createAt)
                .build());

        return new SendMailResponse(emailAuth.getEmailAuthId());
    }

    @Override
    public void verificationCode(EmailValidationRequest emailValidationRequest) {
        EmailAuth auth = emailAuthRepository.findById(emailValidationRequest.getEmailAuthId()).
                orElseThrow(EmailValidationNotFoundException::new);

        if (!(auth.getRandomKey().equals(emailValidationRequest.getRandomKey()) && LocalDateTime.now().isBefore(auth.getCreateAt().plusMinutes(3)))) {
            throw new EmailAuthException();
        }
    }

    @Override
    public void verificationAnalyst(AuthCodeRequest authCodeRequest) {
        AnalystCode code = analystCodeRepository.findByCodeNumber(authCodeRequest.getCodeNumber());

        if (code == null || code.getCodeUse() == 1) {
            throw new CodeNumberNotValidException();
        }
    }


    @Override
    public void checkNickname(NicknameExistsRequest nicknameExistsRequest) {
        boolean nicknameExists = userRepository.existsByUserNickname(nicknameExistsRequest.getUserNickname());

        if(nicknameExists)
            throw new NicknameConflictException();
    }
}
