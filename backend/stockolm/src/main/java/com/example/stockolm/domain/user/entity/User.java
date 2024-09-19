package com.example.stockolm.domain.user.entity;

import com.example.stockolm.global.util.encrypt.EncryptHelper;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String userEmail;

    private String userPassword;

    private String userName;

    private String userImagePath;

    private String refreshToken;

    private String account;

    private String userNickname;

    @NotNull
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    @Builder
    public User(String userEmail, String userPassword, String userName, String userNickname, RoleType roleType, String account, LocalDateTime createAt){
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userName = userName;
        this.userNickname = userNickname;
        this.roleType = roleType;
        this.account = account;
        this.createAt = createAt;
    }

    public void encryptPassword(EncryptHelper encryptHelper) {
        this.userPassword = encryptHelper.encrypt(this.userPassword);
    }

    public void changeRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
