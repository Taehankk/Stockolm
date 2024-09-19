package com.example.stockolm.domain.board.service;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.entity.Board;
import com.example.stockolm.domain.board.entity.Category;
import com.example.stockolm.domain.board.repository.BoardRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Transactional
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;

    private final BoardRepository boardRepository;

    @Override
    public void createBoard(Long userId, CreateBoardRequest createBoardRequest) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Board board = Board.builder()
                .user(user)
                .title(createBoardRequest.getTitle())
                .content(createBoardRequest.getContent())
                .category(Category.valueOf(createBoardRequest.getCategory().toUpperCase()))
                .createAt(LocalDateTime.now())
                .build();

        boardRepository.save(board);
    }
}
