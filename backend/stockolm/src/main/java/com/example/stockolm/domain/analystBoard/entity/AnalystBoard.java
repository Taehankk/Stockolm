package com.example.stockolm.domain.analystBoard.entity;

import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnalystBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analystBoardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private String title;
    private boolean mainContent;
    private String opinion;
    private int goalStock;
    private int currentStock;
    private Long marketCapitalization;
    private String content;
    private LocalDateTime goalDate;

    @Enumerated(EnumType.STRING)
    private GoalCategory goalSuccess;

    private String filePath;
    private int likeCnt;
    private int viewCnt;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @PrePersist
    public void prePersist() {
        this.createAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = LocalDateTime.now();
    }

}
