package com.example.stockolm.domain.analyst.service;

import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;
import com.example.stockolm.domain.analyst.dto.response.AnalystSimpleInfoResponse;

import java.util.List;

public interface AnalystService {
    AnalystInfoResponse searchAnalystInfo(String analystNickName);
    List<AnalystSimpleInfoResponse> searchAnalystSimpleInfo(String analystName);
}
