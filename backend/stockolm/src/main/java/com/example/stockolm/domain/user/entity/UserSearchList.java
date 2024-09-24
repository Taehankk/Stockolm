package com.example.stockolm.domain.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class UserSearchList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSearchListId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String stockSearchContent;

    private String analystSearchContent;

    private String boardSearchContent;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    @PrePersist
    public void prePersist() {
        this.createAt = LocalDateTime.now();
    }

    public void updateTimestamp() {
        this.updateAt = LocalDateTime.now();
    }


    @Builder
    public UserSearchList(User user, String stockSearchContent, String analystSearchContent, String boardSearchContent) {
        this.user = user;
        this.stockSearchContent = stockSearchContent;
        this.analystSearchContent = analystSearchContent;
        this.boardSearchContent = boardSearchContent;
    }


}
