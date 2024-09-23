package com.example.stockolm.domain.analystBoard.service;

import com.example.stockolm.domain.analystBoard.dto.response.AnalystBoardResponse;
import com.example.stockolm.domain.analystBoard.repository.AnalystBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class AnalystBoardServiceImpl implements AnalystBoardService {

    private final AnalystBoardRepository analystBoardRepository;

    @Override
    public List<AnalystBoardResponse> getLikedAnalystBoard(Long userId, String stockName) {

        return analystBoardRepository.getLikedAnalystBoard(userId, stockName);
    }
}
