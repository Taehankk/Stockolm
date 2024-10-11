package com.example.stockolm.domain.follow.repository;

import com.example.stockolm.domain.follow.entity.Follow;
import com.example.stockolm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowCustomRepository {
    List<Follow> findByUser(User user);

    Optional<Follow> findByAnalystAndUser(User analyst, User user);
}
