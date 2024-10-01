package com.example.stockolm.global.util.webclient;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class KoreaInvestWebClientUtil {

    @Value("${web-client.korea-invest.url.simple-read}")
    private String koreaInvestUrl;

    @Value("${web-client.korea-invest.key.access_token}")
    private String koreaInvestAccessToken;

    @Value("${web-client.korea-invest.key.app_key}")
    private String koreaInvestAppKey;

    @Value("${web-client.korea-invest.key.app_secret}")
    private String koreaInvestAppSecretKey;

    private final WebClient webClient;

    public KoreaInvestWebClientUtil(@Autowired WebClient.Builder webClientBuilder,
                                    @Value("${web-client.korea-invest.domain}") String koreaInvestDomain) {
        this.webClient = webClientBuilder.baseUrl(koreaInvestDomain).build();
    }

    public Mono<JsonNode> basicRequestKoreaInvest(String stockCode) {

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(koreaInvestUrl)
                        .queryParam("PRDT_TYPE_CD", "300")
                        .queryParam("PDNO", stockCode)
                        .build())
                .header("content-type", "application/json")
                .header("authorization", "Bearer " + koreaInvestAccessToken)
                .header("appkey", koreaInvestAppKey)
                .header("appsecret", koreaInvestAppSecretKey)
                .header("custtype", "P")
                .header("tr_id", "FHKST01010100")
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

}
