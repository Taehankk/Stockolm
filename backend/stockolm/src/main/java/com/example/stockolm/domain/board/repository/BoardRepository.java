package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardCustomRepository {
    @Modifying
    @Query("UPDATE Board b SET b.viewCnt = b.viewCnt + 1 WHERE b.boardId = :boardId")
    void incrementViewCnt(@Param("boardId") Long boardId);
}
