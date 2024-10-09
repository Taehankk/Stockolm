package com.example.stockolm.domain.comment.service;

import com.example.stockolm.domain.comment.dto.request.CreateCommentRequest;
import com.example.stockolm.domain.board.entity.Board;
import com.example.stockolm.domain.board.repository.BoardRepository;
import com.example.stockolm.domain.comment.dto.request.ModifyCommentRequest;
import com.example.stockolm.domain.comment.dto.response.CommentResponse;
import com.example.stockolm.domain.comment.entity.Comment;
import com.example.stockolm.domain.comment.repository.CommentRepository;
import com.example.stockolm.domain.user.entity.User;
import com.example.stockolm.domain.user.repository.UserRepository;
import com.example.stockolm.global.exception.custom.BoardNotFoundException;
import com.example.stockolm.global.exception.custom.CommentNotFoundException;
import com.example.stockolm.global.exception.custom.UnauthorizedAccessException;
import com.example.stockolm.global.exception.custom.UserNotFoundException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final EntityManager entityManager;

    @Override
    public List<CommentResponse> getCommentList(Long boardId) {
        return commentRepository.findByBoardId(boardId);
    }

    @Override
    public void createComment(Long boardId, Long userId, CreateCommentRequest createCommentRequest) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        // Board 엔티티를 영속성 컨텍스트에서 분리하여 더티 체킹 방지
        // - comment 생성시 board의 수정일까지 업데이트 되는 것을 방지하기 위함
        entityManager.detach(board);

        Comment comment = Comment.builder()
                .board(board)
                .user(user)
                .content(createCommentRequest.getContent())
                .build();

        commentRepository.save(comment);
    }

    @Override
    public void modifyComment(Long commentId, Long userId, ModifyCommentRequest modifyCommentRequest) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);

        // 작성자가 아닌 사람이 URL로 접근하여 수정을 시도하는 경우, 접근 금지 조치
        if (!userId.equals(comment.getUser().getUserId())) {
            throw new UnauthorizedAccessException();
        }

        // Board 더티체킹 방지
        Board board = comment.getBoard();
        entityManager.detach(board);

        comment.update(modifyCommentRequest.getContent());
    }

    @Override
    public void removeComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);

        // 작성자가 아닌 사람이 URL로 접근하여 삭제를 시도하는 경우, 접근 금지 조치
        if (!userId.equals(comment.getUser().getUserId())) {
            throw new UnauthorizedAccessException();
        }

        // Board 더티체킹 방지
        Board board = comment.getBoard();
        entityManager.detach(board);

        commentRepository.deleteById(commentId);
    }

}
