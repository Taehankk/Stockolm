package com.example.stockolm.domain.analystBoard.repository;

import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AnalystBoardRepository extends JpaRepository<AnalystBoard, Long>, AnalystBoardCustomRepository {

    List<AnalystBoard> findByGoalDate(LocalDate timeNow);
}
