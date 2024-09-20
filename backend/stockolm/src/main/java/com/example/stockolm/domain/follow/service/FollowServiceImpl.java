package com.example.stockolm.domain.follow.service;

import com.example.stockolm.domain.analyst.repository.AnalystRepository;
import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.follow.repository.FollowCustomRepository;
import com.example.stockolm.domain.follow.repository.FollowRepository;
import com.example.stockolm.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final UserRepository userRepository;
    private final AnalystRepository analystRepository;
    private final FollowRepository followRepository;

    @Override
    public List<FollowAnalystResponse> getFollowAnalysts(Long userId) {

        List<FollowAnalystResponse> followAnalystInfo = followRepository.getFollowAnalystInfo(userId);

        return followAnalystInfo;
    }
}
