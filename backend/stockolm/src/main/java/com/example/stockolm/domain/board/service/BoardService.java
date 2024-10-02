package com.example.stockolm.domain.board.service;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;
import com.example.stockolm.domain.board.dto.response.BoardPageResponse;
import com.example.stockolm.domain.board.dto.response.BoardResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Page<BoardPageResponse> getBoardPage(String searchWord, Pageable pageable, Long userId);

    void createBoard(Long userId, CreateBoardRequest createBoardRequest);

    void modifyBoard(Long boardId, Long userId, ModifyBoardRequest modifyBoardRequest);

    void removeBoard(Long boardId, Long userId);

    BoardResponse getBoard(Long boardId, Long userId);

    void likeBoard(Long boardId, Long userId);
}
