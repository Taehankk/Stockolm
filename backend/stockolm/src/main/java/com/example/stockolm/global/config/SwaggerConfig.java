package com.example.stockolm.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        servers = {
                @Server(url = "https://j11b201.p.ssafy.io", description = "stockolm https 서버입니다."),
                @Server(url = "http://localhost:8080", description = "stockolm local 서버입니다.")
        }
)
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        Info info = new Info()
                .title("Stockolm API")
                .description("Stockolm application API documentation")
                .version("1.0.0");

//        SecurityScheme securityScheme = new SecurityScheme()
//                .name("Authorization")
//                .type(SecurityScheme.Type.HTTP)
//                .scheme("Bearer")
//                .bearerFormat("JWT");

//        SecurityRequirement securityRequirement = new SecurityRequirement().addList("Authorization");

        return new OpenAPI()
                .info(info);
//                .addSecurityItem(securityRequirement)
//                .components(new Components().addSecuritySchemes("Authorization", securityScheme));
    }
}