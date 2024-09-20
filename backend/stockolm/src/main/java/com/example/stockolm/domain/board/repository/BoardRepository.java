package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
