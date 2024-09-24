package com.example.stockolm.domain.board.entity;

import com.example.stockolm.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    private String content;

    private int viewCnt;

    private int likeCnt;

    @Enumerated(EnumType.STRING)
    private Category category;

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

    // 조회수 증가
    public void incrementViewCnt() {
        this.viewCnt++;
    }

    @Builder
    public Board(User user, String title, String content, Category category) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.category = category;
    }

    public void update(String title, String content, Category category) {
        this.title = title;
        this.content = content;
        this.category = category;
    }
}
