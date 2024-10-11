package com.example.stockolm.domain.upload.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;

@Transactional
@Service
@RequiredArgsConstructor
public class UploadServiceImpl implements UploadService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public String upload(MultipartFile file, String folderName) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename() ; // 파일명 중복 회피를 위해 현재 시간 덧붙이기
        String key = folderName + "/" + fileName; // 다른 파일과 식별하기 위한 키

        // 메타 데이터 생성
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(file.getInputStream().available());

        // S3에 객체 등록
        amazonS3Client.putObject(bucket, key, file.getInputStream(), objMeta); // (버킷명, 파일 키, 파일 데이터, 메타 데이터)

        // 파일 주소 반환 (decoder 사용해 한글이나 특수문자 깨짐 방지)
        return URLDecoder.decode(amazonS3Client.getUrl(bucket, key).toString(), "utf-8");
    }

}
