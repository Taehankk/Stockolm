package com.example.stockolm.domain.analyst.service;

import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;

public interface AnalystService {
    AnalystInfoResponse searchAnalystInfo(String analystNickName);
}
