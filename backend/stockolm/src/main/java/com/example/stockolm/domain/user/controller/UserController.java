package com.example.stockolm.domain.user.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@Tag(name = "User", description = "사용자 관련 API")
public class UserController {
}
