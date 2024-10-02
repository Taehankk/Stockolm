package com.example.stockolm.domain.analyst.repository;

import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;
import com.example.stockolm.domain.analyst.dto.response.AnalystSimpleInfoResponse;

import java.util.List;

public interface AnalystCustomRepository {

    AnalystInfoResponse searchAnalystInfo(Long analystId);
    List<AnalystSimpleInfoResponse> searchAnalystSimpleInfo(String analystName);

}
