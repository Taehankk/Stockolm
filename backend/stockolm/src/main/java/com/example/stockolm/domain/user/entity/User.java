package com.example.stockolm.domain.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

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
}
