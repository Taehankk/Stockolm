package com.example.stockolm.domain.board.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateBoardRequest {
    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private String category;
}
