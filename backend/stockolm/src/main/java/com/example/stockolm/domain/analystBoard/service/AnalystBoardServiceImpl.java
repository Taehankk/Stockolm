package com.example.stockolm.domain.analystBoard.service;

import com.example.stockolm.domain.analystBoard.dto.request.CreateAnalystBoardRequest;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardRepository;
import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.stock.repository.StockRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.StockNotFoundException;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class AnalystBoardServiceImpl implements AnalystBoardService {

    private final AnalystBoardRepository analystBoardRepository;
    private final UserRepository userRepository;
    private final StockRepository stockRepository;

    @Override
    public List<AnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName) {

        return analystBoardRepository.getLikedAnalystBoard(userId, stockName);
    }

    @Override
    public void setMainContent(Long userId, Long analystBoardId) {

        analystBoardRepository.choseMainContent(userId, analystBoardId);
    }

    @Override
    public void createAnalystBoard(Long userId, CreateAnalystBoardRequest createAnalystBoardRequest) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        String stockName = createAnalystBoardRequest.getStockName();
        Stock stock = stockRepository.findByStockName(stockName);
        if (stock == null) {
            throw new StockNotFoundException();
        }

        // file을 S3에 올리고 주소 받는 로직 추가예정

        AnalystBoard analystBoard = AnalystBoard.builder()
                .user(user)
                .stock(stock)
                .title(createAnalystBoardRequest.getTitle())
                .opinion(createAnalystBoardRequest.getOpinion())
                .goalStock(createAnalystBoardRequest.getGoalStock())
                .currentStock(createAnalystBoardRequest.getCurrentStock())
                .marketCapitalization(createAnalystBoardRequest.getMarketCapitalization())
                .content(createAnalystBoardRequest.getContent())
                .goalDate(createAnalystBoardRequest.getGoalDate())
                .goalAccuracy(GoalCategory.WAIT)    // 초기값은 "대기"
                .goalReliability(GoalCategory.WAIT) // 초기값은 "대기"
//                .filePath(filepath)
                .build();

        analystBoardRepository.save(analystBoard);
    }
}
