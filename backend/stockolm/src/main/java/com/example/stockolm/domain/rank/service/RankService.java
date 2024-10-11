package com.example.stockolm.domain.rank.service;

import com.example.stockolm.domain.rank.dto.response.AnalystRankInfoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RankService {
    Page<AnalystRankInfoResponse> getTotalRank(String rankValue, String analystName, Pageable pageable);
}
