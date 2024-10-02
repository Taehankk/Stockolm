package com.example.stockolm.domain.upload.controller;

import com.example.stockolm.domain.upload.service.UploadService;
import com.example.stockolm.domain.user.service.UserService;
import com.example.stockolm.global.auth.AuthPrincipal;
import com.example.stockolm.global.exception.custom.FileRequiredException;
import com.example.stockolm.global.exception.custom.LoginRequiredException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class UploadController {

    private final UploadService uploadService;
    private final UserService userService;

    @PostMapping(value = "/{fileType}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // swagger에서 파일 업로드하기 위한 설정
    @Operation(summary = "파일 업로드", description = "AWS S3 클라우드 서버에 파일 업로드 하는 API")
    public ResponseEntity<String> uploadUserImage(@RequestParam("file") MultipartFile file, @PathVariable String fileType, @AuthPrincipal @Parameter(hidden = true) Long userId) throws IOException {
        if (userId == null) {
            throw new LoginRequiredException();
        }

        if (file == null || file.isEmpty()) {
            throw new FileRequiredException();
        }

        String filePath = uploadService.upload(file, fileType);

        // 유저 프로필 이미지의 경우, user 테이블의 user_image_path 컬럼 수정
        if ("user-image".equals(fileType) && filePath != null) {
            userService.modifyUserImagePath(filePath, userId);
        }

        return ResponseEntity.status(OK).body(filePath);
    }

}
