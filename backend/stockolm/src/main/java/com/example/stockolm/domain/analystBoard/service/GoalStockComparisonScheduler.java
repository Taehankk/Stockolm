package com.example.stockolm.domain.analystBoard.service;

import com.example.stockolm.domain.analyst.entity.AnalystInfo;
import com.example.stockolm.domain.analyst.repository.AnalystRepository;
import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardCustomRepository;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardCustomRepositoryImpl;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.global.util.webclient.KoreaInvestWebClientUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class GoalStockComparisonScheduler {
    private final AnalystRepository analystRepository;
    private final AnalystBoardRepository analystBoardRepository;
    private final KoreaInvestWebClientUtil webClientUtil;

    @Scheduled(cron = "0 30 18 * * ?")  // 매일 18:30에 실행
    public void compareStocks() {

        LocalDate today = LocalDate.now();
        List<AnalystBoard> boardsToCompare = analystBoardRepository.findByGoalDate(today);

        for (AnalystBoard analystBoard : boardsToCompare) {
            User user = analystBoard.getUser();
            AnalystInfo analystInfo = analystRepository.findByUser(user);
            String stockCode = analystBoard.getStock().getStockCode();
            int goalStock = analystBoard.getGoalStock();
            int beforeStock = analystBoard.getCurrentStock();

            getCurrentStockPrice(stockCode).subscribe(currentStock -> {
                processStockComparison(analystBoard, analystInfo, goalStock, beforeStock, currentStock);
                analystBoardRepository.save(analystBoard);
            });
        }

    }

    private Mono<Integer> getCurrentStockPrice(String stockCode) {
        return webClientUtil.basicRequestKoreaInvest(stockCode)
                .map(response -> response.path("output").path("thdt_clpr").asInt()); // 현재 주식 가격
    }

    // 주식 비교 및 결과 처리 로직을 별도 메서드로 분리
    private void processStockComparison(AnalystBoard analystBoard, AnalystInfo analystInfo,
                                        int goalStock, int beforeStock, int currentStock) {

        // 5% 범위 내에 들어올 경우 예측 성공
        int minRangeCurrentStock = (int) (currentStock - (currentStock * 0.05));
        int maxRangeCurrentStock = (int) (currentStock + (currentStock * 0.05));
        if (minRangeCurrentStock <= goalStock && maxRangeCurrentStock >= goalStock) {         // 예측 성공
            analystInfo.raiseScore();
            analystBoard.successGoalAccuracy();
        } else {                                // 예측 실패
            analystBoard.failGoalAccuracy();
        }
        updateReliabilityBasedOnStockChange(analystBoard, goalStock, beforeStock, currentStock);   // 신뢰도 조정
    }

    // 주가 변화에 따른 신뢰도 업데이트
    private void updateReliabilityBasedOnStockChange(AnalystBoard analystBoard,
                                                     int goalStock, int beforeStock, int currentStock) {

        if (currentStock > beforeStock) {  // 주가가 상승한 경우
            if (goalStock > beforeStock) {  // 상승 예측 성공
                analystBoard.successGoalReliability();
            } else {                        // 상승 예측 실패
                analystBoard.failGoalReliability();
            }
        } else if (currentStock < beforeStock) {  // 주가가 하락한 경우
            if (goalStock > beforeStock) {  // 상승 예측 실패
                analystBoard.failGoalReliability();
            } else {                        // 하락 예측 성공
                analystBoard.successGoalReliability();
            }
        }
    }

}
