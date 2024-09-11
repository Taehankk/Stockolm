package com.example.stockolm.domain.user.service;

import com.example.stockolm.domain.user.dto.request.SendMailRequest;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import com.example.stockolm.domain.user.entity.EmailAuth;
import com.example.stockolm.domain.user.repository.EmailAuthRepository;
import com.example.stockolm.domain.user.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

private final JavaMailSender mailSender;

private final UserRepository userRepository;

private final EmailAuthRepository emailAuthRepository;


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
}
