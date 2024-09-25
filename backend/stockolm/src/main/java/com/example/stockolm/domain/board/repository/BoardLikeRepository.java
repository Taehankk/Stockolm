package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.entity.Board;
import com.example.stockolm.domain.board.entity.BoardLike;
import com.example.stockolm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
    Optional<BoardLike> findByBoardAndUser(Board board, User user);
}
