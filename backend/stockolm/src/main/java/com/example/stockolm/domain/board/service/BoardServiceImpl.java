package com.example.stockolm.domain.board.service;

import com.example.stockolm.domain.board.dto.request.CreateBoardRequest;
import com.example.stockolm.domain.board.dto.request.CreateCommentRequest;
import com.example.stockolm.domain.board.dto.request.ModifyBoardRequest;
import com.example.stockolm.domain.board.dto.response.BoardResponse;
import com.example.stockolm.domain.board.entity.Board;
import com.example.stockolm.domain.board.entity.BoardLike;
import com.example.stockolm.domain.board.entity.Category;
import com.example.stockolm.domain.board.entity.Comment;
import com.example.stockolm.domain.board.repository.BoardLikeRepository;
import com.example.stockolm.domain.board.repository.BoardRepository;
import com.example.stockolm.domain.board.repository.CommentRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.BoardNotFoundException;
import com.example.stockolm.global.exception.custom.UnauthorizedAccessException;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final CommentRepository commentRepository;

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
            throw new UnauthorizedAccessException();
        }

        board.update(
                modifyBoardRequest.getTitle(),
                modifyBoardRequest.getContent(),
                Category.valueOf(modifyBoardRequest.getCategory().toUpperCase())
        );

//        boardRepository.save(board); // 영속성 컨텍스트가 자동으로 DB 업데이트
    }

    @Override
    public void removeBoard(Long boardId, Long userId) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        // 작성자가 아닌 사람이 URL로 접근하여 삭제를 시도하는 경우, 접근 금지 조치
        if (!userId.equals(board.getUser().getUserId())) {
            throw new UnauthorizedAccessException();
        }

        boardRepository.deleteById(boardId);
    }

    @Override
    public BoardResponse retrieveBoard(Long boardId, Long userId) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        List<String> imagePathList = boardRepository.findImagePathById(boardId);

        boolean isLike = boardRepository.isLike(boardId, userId);

        List<Comment> commentList = boardRepository.findCommentById(boardId);

        board.incrementViewCnt(); // 조회수 증가 -> 영속성 컨텍스트가 자동으로 DB 업데이트

        return BoardResponse.builder()
                .userNickname(board.getUser().getUserNickname())
                .userImagePath(board.getUser().getUserImagePath())
                .title(board.getTitle())
                .content(board.getContent())
                .category(board.getCategory().toString())
                .imagePathList(imagePathList)
                .viewCnt(board.getViewCnt())
                .likeCnt(board.getLikeCnt())
                .createAt(board.getCreateAt())
                .updateAt(board.getUpdateAt())
                .isLike(isLike)
                .commentList(commentList)
                .build();
    }

    @Override
    public void likeBoard(Long boardId, Long userId) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        boardLikeRepository.findByBoardAndUser(board, user)
                .ifPresentOrElse(
                        // 이미 좋아요 되어있는 경우, 좋아요 취소
                        boardLike -> {
                            boardLikeRepository.delete(boardLike);
                            board.decrementLikeCnt();
                        },
                        // 좋아요 되어있지 않은 경우, 좋아요 추가
                        () -> {
                            boardLikeRepository.save(
                                    BoardLike.builder()
                                            .board(board)
                                            .user(user)
                                            .build()
                            );
                            board.incrementLikeCnt();
                        }
                );
    }

    @Override
    public void createComment(Long boardId, Long userId, CreateCommentRequest createCommentRequest) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Comment comment = Comment.builder()
                .board(board)
                .user(user)
                .content(createCommentRequest.getContent())
                .build();

        commentRepository.save(comment);
    }
}
