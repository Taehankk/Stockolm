package com.example.stockolm.domain.analystBoard.entity;

import com.example.stockolm.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnalystBoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analystBoardLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analyst_board_id")
    private AnalystBoard analystBoard;

}
