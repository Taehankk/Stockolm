package com.example.stockolm.domain.board.service;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;
import com.example.stockolm.domain.board.entity.Board;
import com.example.stockolm.domain.board.entity.Category;
import com.example.stockolm.domain.board.repository.BoardRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.BoardNotFoundException;
import com.example.stockolm.global.exception.custom.UnauthorizedModificationException;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .build();

        boardRepository.save(board);
    }

    @Override
    public void modifyBoard(Long boardId, Long userId, ModifyBoardRequest modifyBoardRequest) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        // 작성자가 아닌 사람이 URL로 접근하여 수정을 시도하는 경우, 접근 금지 조치
        if (!userId.equals(board.getUser().getUserId())) {
            throw new UnauthorizedModificationException();
        }

        board.update(
                modifyBoardRequest.getTitle(),
                modifyBoardRequest.getContent(),
                Category.valueOf(modifyBoardRequest.getCategory().toUpperCase())
        );

//        boardRepository.save(board); // 영속성 컨텍스트가 자동으로 DB 업데이트
    }
}
