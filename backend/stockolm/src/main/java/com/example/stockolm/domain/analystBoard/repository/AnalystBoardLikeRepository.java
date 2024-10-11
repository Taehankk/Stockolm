package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;
import com.example.stockolm.domain.analystBoard.entity.AnalystBoardLike;
import com.example.stockolm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnalystBoardLikeRepository extends JpaRepository<AnalystBoardLike, Long> {
    Optional<AnalystBoardLike> findByAnalystBoardAndUser(AnalystBoard analystBoard, User user);
}
