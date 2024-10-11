package com.example.stockolm.domain.comment.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyCommentRequest {
    @NotNull
    private String content;
}
