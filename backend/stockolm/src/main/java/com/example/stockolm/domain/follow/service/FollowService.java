package com.example.stockolm.domain.follow.service;

import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;

import java.util.List;

public interface FollowService {
    public List<FollowAnalystResponse> getFollowAnalysts(Long userId);

}
