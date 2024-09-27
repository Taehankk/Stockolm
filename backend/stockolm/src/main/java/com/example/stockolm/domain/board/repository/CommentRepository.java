package com.example.stockolm.domain.board.repository;

import com.example.stockolm.domain.board.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}