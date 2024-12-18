package com.example.stockolm.domain.user.repository;

import com.example.stockolm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserEmail(String userEmail);

    boolean existsByUserNickname(String userNickname);

    User findByUserEmail(String userEmail);

    User findByUserName(String userName);

    User findByUserNickname(String userNickname);
}
