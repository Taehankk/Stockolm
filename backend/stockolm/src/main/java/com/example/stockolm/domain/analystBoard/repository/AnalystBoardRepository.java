package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalystBoardRepository extends JpaRepository<AnalystBoard, Long>, AnalystBoardCustomRepository {
}
