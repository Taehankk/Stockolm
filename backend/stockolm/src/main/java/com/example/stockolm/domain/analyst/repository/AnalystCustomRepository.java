package com.example.stockolm.domain.analyst.repository;

import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;

public interface AnalystCustomRepository {

    AnalystInfoResponse searchAnalystInfo(Long analystId);

}
