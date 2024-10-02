package com.example.stockolm.domain.analyst.entity;

import com.example.stockolm.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnalystInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "analyst_info_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private int totalAnalystScore;

    private LocalDateTime updateAt;

    private int reliability;

    private int accuracy;

    public void raiseScore() {
        this.totalAnalystScore += 100;
    }

    public void updateAccuracy(int accuracy) {
        this.accuracy = accuracy;
    }

    public void updateReliability(int reliability) {
        this.reliability = reliability;
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = LocalDateTime.now();
    }

}
