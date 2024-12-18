package com.example.stockolm.domain.user.service;

import com.example.stockolm.domain.follow.entity.Follow;
import com.example.stockolm.domain.follow.repository.FollowRepository;
import com.example.stockolm.domain.user.dto.request.*;
import com.example.stockolm.domain.user.dto.response.FindPasswordResponse;
import com.example.stockolm.domain.user.dto.response.LoginResponse;
import com.example.stockolm.domain.user.dto.response.SendMailResponse;
import com.example.stockolm.domain.user.dto.response.UserInfoResponse;
import com.example.stockolm.domain.user.entity.AnalystCode;
import com.example.stockolm.domain.user.entity.EmailAuth;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.AnalystCodeRepository;
import com.example.stockolm.domain.user.repository.EmailAuthRepository;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.*;
import com.example.stockolm.global.util.encrypt.EncryptHelper;
import com.example.stockolm.global.util.jwt.JwtUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.auth.login.LoginException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final String DEFAULT_USER_IMAGE_PATH = "https://stockolm.s3.ap-northeast-2.amazonaws.com/user-image/1728275338835_basic-profile.png";

    private final JavaMailSender mailSender;

    private final UserRepository userRepository;

    private final EmailAuthRepository emailAuthRepository;

    private final AnalystCodeRepository analystCodeRepository;

    private final FollowRepository followRepository;

    private final EncryptHelper encryptHelper;
    private final JwtUtil jwtUtil;

    public void sendingMail(String email, String verificationCode) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom("stockolm5563@naver.com"); // 보내는 사람 이메일
        helper.setTo(email);  // 받는 사람 이메일
        helper.setSubject("스톡올름에서 인증코드를 보내드립니다.");  // 이메일 제목
        helper.setText("인증코드는 : " + verificationCode + " 입니다.");  // 이메일 내용
        mailSender.send(message);  // 이메일 전송
    }


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

        String email = sendMailRequest.getUserEmail();

        if (userRepository.existsByUserEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

        sendingMail(email,verificationCode);

        LocalDateTime createAt = LocalDateTime.now();
        EmailAuth emailAuth = emailAuthRepository.save(EmailAuth.builder()
                .randomKey(verificationCode)
                .createAt(createAt)
                .authEmail(email)
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

        if (nicknameExists)
            throw new NicknameConflictException();
    }

    @Override
    public void signUp(SignUpRequest signUpRequest) {
        EmailAuth auth = emailAuthRepository.findById(signUpRequest.getEmailAuthId())
                .orElseThrow(EmailAuthException::new);

        if (!(auth.getAuthEmail().equals(signUpRequest.getUserEmail()))) {
            emailAuthRepository.delete(auth);
            throw new EmailAuthException();
        }
        emailAuthRepository.delete(auth);

        User user = signUpRequest.toEntity();

        if (user.getRoleType().name().equals("ANALYST") && user.getUserName() == null)
            throw new AnalystSignUpException();

        user.encryptPassword(encryptHelper);

        user.setDefaultUserImagePath(DEFAULT_USER_IMAGE_PATH);

        userRepository.save(user);

    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Long userId = authenticateUser(loginRequest);

        String roleType = getRoleType(userId);

        String accessToken = jwtUtil.createAccessToken(userId,roleType);

        String refreshToken = jwtUtil.createRefreshToken(userId,roleType);

        saveRefreshToken(userId, refreshToken);

        return new LoginResponse(userId, accessToken, refreshToken);


    }

    @Override
    public void saveRefreshToken(Long userId, String refreshToken) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.changeRefreshToken(refreshToken);
    }

    @Override
    public boolean isRefreshTokenValid(Long userId, String refreshToken) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null && refreshToken.equals(user.getRefreshToken());
    }

    @Override
    public void updatePassword(FindPasswordRequest findPasswordRequest) {
        // 1. 사용자 이메일을 통해 사용자 조회
        User user = userRepository.findByUserEmail(findPasswordRequest.getUserEmail());

        // 2. 새로운 비밀번호와 기존 비밀번호 비교 (평문 비밀번호를 암호화된 비밀번호와 비교)
        if (encryptHelper.isMatch(findPasswordRequest.getNewPassword(), user.getUserPassword())) {
            throw new NewPasswordException();
        }

        // 3. 새로운 비밀번호 암호화 및 업데이트
        String newPassword = encryptHelper.encrypt(findPasswordRequest.getNewPassword());
        user.updatePassword(newPassword);
    }

    @Override
    public void deleteRefreshToken(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        user.deleteRefreshToken();
    }


    @Override
    public Long authenticateUser(LoginRequest loginRequest) {
        User user = userRepository.findByUserEmail(loginRequest.getUserEmail());
        if (user == null)
            throw new UserNotFoundException();

        if (encryptHelper.isMatch(loginRequest.getUserPassword(), user.getUserPassword()))
            return user.getUserId();

        throw new AuthenticationFailedException();
    }

    @Override
    public UserInfoResponse getUserInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        return new UserInfoResponse(user.getUserName(), user.getUserNickname(), user.getUserImagePath());
    }

    @Override
    public void withdraw(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        userRepository.delete(user);
    }

    @Override
    public void modifyUserNickname(Long userId, NicknameUpdateRequest nicknameUpdateRequest) {
        User existUser = userRepository.findByUserNickname(nicknameUpdateRequest.getUserNickname());

        if(existUser != null)
            throw new NicknameConflictException();

        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.updateNickname(nicknameUpdateRequest.getUserNickname());
    }

    @Override
    public void updateNewPassword(Long userId, PasswordUpdateRequest passwordUpdateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        // 새로운 비밀번호와 기존 비밀번호 비교 (평문 비밀번호를 암호화된 비밀번호와 비교)
        if (encryptHelper.isMatch(passwordUpdateRequest.getNewPassword(), user.getUserPassword())) {
            throw new NewPasswordException();
        }

        // 새로운 비밀번호 암호화 및 업데이트
        String newPassword = encryptHelper.encrypt(passwordUpdateRequest.getNewPassword());
        user.updatePassword(newPassword);
    }

    @Override
    public void followAnalyst(Long userId, FollowRequest followRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        if(user.getUserNickname().equals(followRequest.getUserNickname()))
            throw new FollowingException();

        User analyst = Optional.ofNullable(userRepository.findByUserNickname(followRequest.getUserNickname()))
                .filter(a -> "ANALYST".equals(a.getRoleType().name()))
                .orElseThrow(AnalystNotFoundException::new);

        followRepository.findByAnalystAndUser(analyst, user)
                .ifPresentOrElse(
                        followRepository::delete,
                        () -> followRepository.save(Follow.builder()
                                .analyst(analyst)
                                .user(user)
                                .build())
                );
    }

    @Override
    public String getRoleType(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        return user.getRoleType().name();
    }


    @Override
    public FindPasswordResponse findPassword(FindMailRequest findMailRequest, String verificationCode) throws MessagingException {
        String email = findMailRequest.getUserEmail();

        if (!userRepository.existsByUserEmail(email)) {
            throw new EmailNotExistsException();
        }

        sendingMail(email,verificationCode);

        LocalDateTime createAt = LocalDateTime.now();
        EmailAuth emailAuth = emailAuthRepository.save(EmailAuth.builder()
                .randomKey(verificationCode)
                .createAt(createAt)
                .authEmail(email)
                .build());

        return new FindPasswordResponse(emailAuth.getEmailAuthId());
    }

    @Override
    public void modifyUserImagePath(String filePath, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.updateImagePath(filePath);
    }

}
