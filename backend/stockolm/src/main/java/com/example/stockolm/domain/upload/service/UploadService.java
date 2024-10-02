package com.example.stockolm.domain.upload.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadService {
    String upload(MultipartFile file, String folderName) throws IOException;
}
