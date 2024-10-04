package com.example.stockolm.domain.analyst.repository;

import com.example.stockolm.domain.analyst.dto.response.AnalystInfoResponse;
import com.example.stockolm.domain.analyst.dto.response.AnalystSimpleInfoResponse;
import com.example.stockolm.domain.analyst.entity.AnalystInfo;
import com.example.stockolm.domain.user.entity.User;

import java.util.List;

public interface AnalystCustomRepository {

    AnalystInfoResponse searchAnalystInfo(User analyst);
    List<AnalystSimpleInfoResponse> searchAnalystSimpleInfo(String analystName);

}
