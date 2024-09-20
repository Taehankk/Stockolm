package com.example.stockolm.domain.follow.controller;

import com.example.stockolm.domain.follow.dto.response.FollowAnalystResponse;
import com.example.stockolm.domain.follow.service.FollowService;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping("/api/v1/follow")
@RequiredArgsConstructor
@Tag(name = "Follow", description = "follow 관련 API")
public class FollowController {

    private final FollowService followService;

    @GetMapping("/analysts")
    @Operation(summary = "관심 분석가 조회", description = "관심 분석가 조회 API")
    public ResponseEntity<?> getFollowAnalystList(@AuthPrincipal @Parameter(hidden = true) Long userId) {

        if (userId == null) {
            throw new LoginRequiredException();
        }

        List<FollowAnalystResponse> followAnalysts = followService.getFollowAnalysts(userId);

        return ResponseEntity.status(OK).body(followAnalysts);
    }

}
