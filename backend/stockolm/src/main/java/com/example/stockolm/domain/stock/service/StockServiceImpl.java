package com.example.stockolm.domain.stock.service;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;

    @Override
    public List<FollowStockResponse> getFollowStockList(Long userId) {

        List<FollowStockResponse> followStockInfoList = stockRepository.getFollowStockInfo(userId);

        return followStockInfoList;
    }
}
