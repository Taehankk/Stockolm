package com.example.stockolm.domain.rank.service;

import com.example.stockolm.domain.rank.dto.response.AnalystRankInfoResponse;
import com.example.stockolm.domain.rank.repository.RankCustomRepository;
import com.example.stockolm.domain.rank.repository.StockAnalystRankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class RankServiceImpl implements RankService {

    private final StockAnalystRankRepository stockAnalystRankRepository;
    private final RankCustomRepository rankCustomRepository;

    @Override
    public Page<AnalystRankInfoResponse> getTotalRank(String rankValue, String analystName, Pageable pageable) {
        return rankCustomRepository.getTotalRank(rankValue, analystName, pageable);
    }
}
