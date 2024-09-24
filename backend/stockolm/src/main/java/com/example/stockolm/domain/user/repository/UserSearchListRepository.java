package com.example.stockolm.domain.user.repository;

import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.entity.UserSearchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSearchListRepository extends JpaRepository<UserSearchList, Long> {
    UserSearchList findByUserAndStockSearchContent(User user, String stockSearchContent);

}
