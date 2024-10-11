package com.example.stockolm.domain.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnalystCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analystCodeId;

    private String codeNumber;

    private Integer codeUse;

    private LocalDateTime createAt;
}
