package com.example.stockolm.domain.stock.service;

import com.example.stockolm.domain.analyst.entity.AnalystInfo;
import com.example.stockolm.domain.analyst.repository.AnalystRepository;
import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardRepository;
import com.example.stockolm.domain.board.entity.Board;
import com.example.stockolm.domain.board.repository.BoardRepository;
import com.example.stockolm.domain.stock.dto.response.*;
import com.example.stockolm.domain.stock.entity.FavoriteStock;
import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.stock.entity.StockData;
import com.example.stockolm.domain.stock.entity.StockInfo;
import com.example.stockolm.domain.stock.repository.FavoriteStockRepository;
import com.example.stockolm.domain.stock.repository.StockDataRepository;
import com.example.stockolm.domain.stock.repository.StockInfoRepository;
import com.example.stockolm.domain.stock.repository.StockRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.entity.UserSearchList;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.domain.user.repository.UserSearchListRepository;
import com.example.stockolm.global.exception.custom.BoardNotFoundException;
import com.example.stockolm.global.exception.custom.StockNotFoundException;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final UserRepository userRepository;
    private final UserSearchListRepository userSearchListRepository;
    private final FavoriteStockRepository favoriteStockRepository;
    private final StockDataRepository stockDataRepository;
    private final StockInfoRepository stockInfoRepository;
    private final AnalystBoardRepository analystBoardRepository;
    private final AnalystRepository analystRepository;

    @Override
    public List<FollowStockResponse> getFollowStockList(Long userId) {

        List<FollowStockResponse> followStockInfoList = stockRepository.getFollowStockInfo(userId);

        return followStockInfoList;
    }

    @Override
    public SearchStockResponse createStockSearchLog(Long userId, String stockName) {
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
        return new SearchStockResponse(stock.getStockId());
    }

    @Override
    public StockSearchResponse stockSearchList(Long userId) {

        List<HotStock> hotStockList = stockRepository.getHotStockList();

        List<RecentStock> recentStockList = stockRepository.getRecentStockList(userId);

        return StockSearchResponse.builder()
                .recentStockList(recentStockList)
                .hotStockList(hotStockList)
                .build();
    }

    @Override
    public void followStock(Long userId, String stockName) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        Stock stock = stockRepository.findByStockName(stockName);

        if (stock == null) {
            throw new StockNotFoundException();
        }

        favoriteStockRepository.findByStockAndUser(stock, user)
                .ifPresentOrElse(
                        favoriteStockRepository::delete,
                        () -> favoriteStockRepository.save(
                                FavoriteStock.builder()
                                        .user(user)
                                        .stock(stock)
                                        .build())
                );
    }

    @Cacheable(value = "stockDetailCache", key = "#stockName")
    @Override
    public StockDetailResponse getStockDetail(Long userId, String stockName) {
        Stock stock = stockRepository.findByStockName(stockName);
        if (stock == null) {
            throw new StockNotFoundException();
        }


        Boolean existFavoriteStockUser = false;

        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(UserNotFoundException::new);

            existFavoriteStockUser = favoriteStockRepository.existsByUser(user);
        }

        List<StockData> stockDataList = stockDataRepository.findByStockId(stock.getStockId());

        return StockDetailResponse.builder()
                .stockData(stockDataList)
                .isFollow(existFavoriteStockUser)
                .build();
    }

    @Override
    public List<StockSearchResultResponse> getStockSearchResult(String searchKeyword) {

        return stockRepository.findBySearchKeyword(searchKeyword);
    }

    @Override
    public List<AnalyzedStockResponse> getAnalyzedStockList(Long userId) {

        return stockRepository.getAnalyzedStockList(userId);
    }

    @Override
    public StockInfo getStockInfo(String stockCode) {
        return stockInfoRepository.findByStockCode(stockCode);
    }

    @Override
    public List<BestAnalystResponse> getBestAnalyst(Long stockId) {

        return analystBoardRepository.findBestAnalystByStockId(stockId);
    }


}
