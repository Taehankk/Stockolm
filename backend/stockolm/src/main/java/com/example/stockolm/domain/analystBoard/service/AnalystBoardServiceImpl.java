package com.example.stockolm.domain.analystBoard.service;

import com.example.stockolm.domain.analystBoard.dto.request.CreateAnalystBoardRequest;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardPageResponse;
import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.dto.response.LikedAnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.entity.AnalystBoard;
import com.example.stockolm.domain.analystBoard.entity.AnalystBoardLike;
import com.example.stockolm.domain.analystBoard.entity.GoalCategory;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardLikeRepository;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardRepository;
import com.example.stockolm.domain.stock.entity.Stock;
import com.example.stockolm.domain.stock.repository.StockRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.BoardNotFoundException;
import com.example.stockolm.global.exception.custom.StockNotFoundException;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final AnalystBoardLikeRepository analystBoardLikeRepository;

    @Override
    public List<LikedAnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName) {

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
                .filePath(createAnalystBoardRequest.getFilePath())
                .build();

        analystBoardRepository.save(analystBoard);
    }

    @Override
    public AnalystBoardResponse getAnalystBoard(Long analystBoardId, Long userId) {
        AnalystBoard analystBoard = analystBoardRepository.findById(analystBoardId).orElseThrow(BoardNotFoundException::new);

        boolean isLike = analystBoardRepository.isLike(analystBoardId, userId);

        analystBoard.incrementViewCnt(); // 조회수 증가

        return AnalystBoardResponse.builder()
                .stockName(analystBoard.getStock().getStockName())
                .title(analystBoard.getTitle())
                .userName(analystBoard.getUser().getUserName())
                .userNickName(analystBoard.getUser().getUserNickname())
                .userImagePath(analystBoard.getUser().getUserImagePath())
                .opinion(analystBoard.getOpinion())
                .goalStock(analystBoard.getGoalStock())
                .currentStock(analystBoard.getCurrentStock())
                .marketCapitalization(analystBoard.getMarketCapitalization())
                .content(analystBoard.getContent())
                .filePath(analystBoard.getFilePath())
                .likeCnt(analystBoard.getLikeCnt())
                .viewCnt(analystBoard.getViewCnt())
                .createAt(analystBoard.getCreateAt())
                .updateAt(analystBoard.getUpdateAt())
                .isLike(isLike)
                .build();
    }

    @Override
    public void likeAnalystBoard(Long analystBoardId, Long userId) {
        AnalystBoard analystBoard = analystBoardRepository.findById(analystBoardId).orElseThrow(BoardNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        analystBoardLikeRepository.findByAnalystBoardAndUser(analystBoard, user)
                .ifPresentOrElse(
                        // 이미 좋아요 되어있는 경우, 좋아요 취소
                        analystBoardLike -> {
                            analystBoardLikeRepository.delete(analystBoardLike);
                            analystBoard.decrementLikeCnt();
                        },
                        // 좋아요 되어있지 않은 경우, 좋아요 추가
                        () -> {
                            analystBoardLikeRepository.save(
                                    AnalystBoardLike.builder()
                                            .analystBoard(analystBoard)
                                            .user(user)
                                            .build()
                            );
                            analystBoard.incrementLikeCnt();
                        }
                );
    }

    @Override
    public Page<AnalystBoardPageResponse> getAnalystBoardPage(String searchWord, Pageable pageable, Long userId, Boolean myBoard) {
        return analystBoardRepository.getAnalystBoardPage(searchWord, pageable, userId, myBoard);
    }
}
