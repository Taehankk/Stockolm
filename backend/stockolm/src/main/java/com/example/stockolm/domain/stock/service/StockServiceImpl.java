package com.example.stockolm.domain.stock.service;

import com.example.stockolm.domain.stock.dto.response.FollowStockResponse;
import com.example.stockolm.domain.stock.dto.response.StockSearchResponse;
import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.stock.repository.StockRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.entity.UserSearchList;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.domain.user.repository.UserSearchListRepository;
import com.example.stockolm.global.exception.custom.StockNotFoundException;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final UserRepository userRepository;
    private final UserSearchListRepository userSearchListRepository;

    @Override
    public List<FollowStockResponse> getFollowStockList(Long userId) {

        List<FollowStockResponse> followStockInfoList = stockRepository.getFollowStockInfo(userId);

        return followStockInfoList;
    }

    @Override
    public void searchStock(Long userId, String stockName) {
        Stock stock = stockRepository.findByStockName(stockName);
        if (stock == null) {
            throw new StockNotFoundException();
        }

        stock.plusStockSearchCnt();

        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(UserNotFoundException::new);

            UserSearchList existingSearchList = userSearchListRepository.findByUserAndStockSearchContent(user, stockName);
            if (existingSearchList != null) {
                existingSearchList.updateTimestamp();
            } else {
                UserSearchList newSearchList = UserSearchList.builder()
                        .stockSearchContent(stockName)
                        .user(user)
                        .build();
                userSearchListRepository.save(newSearchList);
            }
        }
    }

    @Override
    public StockSearchResponse stockSearchList(Long userId) {
        List<String> hotStockCodeList = stockRepository.getHotStockCodeList();
        List<String> hotStockNameList = stockRepository.getHotStockNameList();

        List<String> recentStockCodeList = stockRepository.getRecentStockCodeList(userId);
        List<String> recentStockNameList = stockRepository.getRecentStockNameList(userId);

        return StockSearchResponse.builder()

                .hotStockCodeList(hotStockCodeList)
                .hotStockNameList(hotStockNameList)
                .recentStockCodeList(recentStockCodeList)
                .recentStockNameList(recentStockNameList)
                .build();

    }


}
