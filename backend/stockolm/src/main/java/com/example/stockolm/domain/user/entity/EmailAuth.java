package com.example.stockolm.domain.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emailAuthId;

    private String randomKey;

    private LocalDateTime createAt;

    @Builder
    public EmailAuth(String randomKey, LocalDateTime createAt) {
        this.randomKey = randomKey;
        this.createAt = createAt;
    }


}
