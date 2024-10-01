package com.example.stockolm.domain.analyst.repository;

import com.example.stockolm.domain.analyst.entity.AnalystInfo;
import com.example.stockolm.domain.follow.entity.Follow;
import com.example.stockolm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalystRepository extends JpaRepository<AnalystInfo, Long>, AnalystCustomRepository {
    AnalystInfo findByUser(User user);
}
