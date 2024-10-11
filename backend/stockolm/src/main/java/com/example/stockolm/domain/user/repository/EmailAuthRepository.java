package com.example.stockolm.domain.user.repository;

import com.example.stockolm.domain.user.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailAuthRepository extends JpaRepository<EmailAuth,Long> {
}
