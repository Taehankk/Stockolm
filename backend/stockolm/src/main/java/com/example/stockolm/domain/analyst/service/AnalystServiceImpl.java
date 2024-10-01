package com.example.stockolm.domain.analyst.service;

import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;
import com.example.stockolm.domain.analyst.repository.AnalystRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.AnalystNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class AnalystServiceImpl implements AnalystService {

    private final AnalystRepository analystRepository;
    private final UserRepository userRepository;

    @Override
    public AnalystInfoResponse searchAnalystInfo(String analystName) {

        User analyst = userRepository.findByUserName(analystName);

        if (analyst == null) {
            throw new AnalystNotFoundException();
        }

        return analystRepository.searchAnalystInfo(analyst.getUserId());
    }
}
