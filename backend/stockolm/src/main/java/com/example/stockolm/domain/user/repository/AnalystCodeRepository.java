package com.example.stockolm.domain.user.repository;

import com.example.stockolm.domain.user.entity.AnalystCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalystCodeRepository extends JpaRepository<AnalystCode,Long> {
    AnalystCode findByCodeNumber(String codeNumber);
}
