package com.example.stockolm.domain.follow.repository;

import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;

import java.util.List;

public interface FollowCustomRepository {

    public List<FollowAnalystResponse> getFollowAnalystInfo(Long userId);

}
