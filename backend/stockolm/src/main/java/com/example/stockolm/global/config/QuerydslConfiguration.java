package com.example.stockolm.global.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuerydslConfiguration {

    @Bean
    public JPAQueryFactory jpaQueryFactory(@Autowired EntityManager em) {
        return new JPAQueryFactory(em);
    }
}