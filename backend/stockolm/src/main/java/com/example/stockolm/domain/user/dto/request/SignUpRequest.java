package com.example.stockolm.domain.user.dto.request;

import com.example.stockolm.domain.user.entity.RoleType;
import com.example.stockolm.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Getter
public class SignUpRequest {
    private String userEmail;

    private String userPassword;

    private String userName;

    private String userNickname;

    private String roleType;

    private Long emailAuthId;

    public User toEntity(){
        return User.builder()
                .userEmail(userEmail)
                .userPassword(userPassword)
                .userName(userName)
                .userNickname(userNickname)
                .roleType(RoleType.valueOf(roleType.toUpperCase()))
                .createAt(LocalDateTime.now())
                .build();
    }

}
