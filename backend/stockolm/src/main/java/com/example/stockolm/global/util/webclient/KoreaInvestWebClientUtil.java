package com.example.stockolm.global.util.webclient;

import com.example.stockolm.domain.stock.dto.response.GetChartResponse;
import com.example.stockolm.domain.stock.dto.response.StockPriceResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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

    private final ObjectMapper objectMapper;

    public KoreaInvestWebClientUtil(@Autowired WebClient.Builder webClientBuilder,
                                    @Value("${web-client.korea-invest.domain}") String koreaInvestDomain, ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.webClient = webClientBuilder.baseUrl(koreaInvestDomain).build();
    }

    private HttpHeaders createHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(koreaInvestAccessToken);
        headers.set("appkey", koreaInvestAppKey);
        headers.set("appsecret", koreaInvestAppSecretKey);
        headers.set("tr_id", "FHKST03010200");
        headers.set("custtype", "P");
        return headers;
    }

    private HttpHeaders createHeader2() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(koreaInvestAccessToken);
        headers.set("appkey", koreaInvestAppKey);
        headers.set("appsecret", koreaInvestAppSecretKey);
        headers.set("tr_id", "FHKST01010100");
        headers.set("custtype", "P");
        return headers;
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

    public Flux<List<GetChartResponse>> getChart(String stockCode) {
        HttpHeaders headers = createHeader();
        int range = Math.abs(getCurrent30MinuteRange());

        // 30분 간격으로 9시부터 현재 시각까지 호출
        return Flux.range(0, range + 1)
                .concatMap(index -> {
                    LocalTime queryStartTime = LocalTime.of(9, 30).plusMinutes(index * 30);
                    LocalTime queryEndTime = queryStartTime.plusMinutes(30);

                    String formattedStartTime = queryStartTime.format(DateTimeFormatter.ofPattern("HHmmss"));
                    String formattedEndTime = queryEndTime.format(DateTimeFormatter.ofPattern("HHmmss"));

                    return webClient.get()
                            .uri(uriBuilder -> uriBuilder.path("/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice")
                                    .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                                    .queryParam("FID_INPUT_ISCD", stockCode)
                                    .queryParam("FID_INPUT_HOUR_1", formattedStartTime)  // 시작 시간
                                    .queryParam("FID_INPUT_HOUR_2", formattedEndTime)    // 종료 시간
                                    .queryParam("FID_PW_DATA_INCU_YN", "Y")
                                    .queryParam("FID_ETC_CLS_CODE", "")
                                    .build())
                            .headers(httpHeaders -> httpHeaders.addAll(headers))
                            .retrieve()
                            .bodyToMono(String.class)
                            .flatMap(this::parseGetChart)
                            .onErrorResume(e -> {
                                System.out.println("Error occurred: " + e.getMessage());
                                return Mono.empty();
                            });
                });
    }


    private Mono<List<GetChartResponse>> parseGetChart(String response) {
        try {
            List<GetChartResponse> responseDataList = new ArrayList<>();
            JsonNode rootNode = objectMapper.readTree(response);

            // output2 필드가 있는지 확인 (상세 데이터)
            if (rootNode.has("output2")) {
                JsonNode outputArray = rootNode.get("output2");

                // output2가 배열이면 첫 번째 요소만 처리
                if (outputArray.isArray() && !outputArray.isEmpty()) {

                    // output2가 배열이므로 각 배열 요소를 처리
                    if (outputArray.isArray()) {
                        for (JsonNode outputNode : outputArray) {


                            // 새로운 객체 생성
                            GetChartResponse responseData = GetChartResponse.builder()
                                    .stckBsopDate(getJsonNodeValue(outputNode, "stck_bsop_date"))
                                    .stckCntgHour(getJsonNodeValue(outputNode, "stck_cntg_hour"))
                                    .acmlTrPbmn(getJsonNodeValue(outputNode, "acml_tr_pbmn"))
                                    .stckPrpr(getJsonNodeValue(outputNode, "stck_prpr"))
                                    .stckOprc(getJsonNodeValue(outputNode, "stck_oprc"))
                                    .stckHgpr(getJsonNodeValue(outputNode, "stck_hgpr"))
                                    .stckLwpr(getJsonNodeValue(outputNode, "stck_lwpr"))
                                    .build();
                            String stckCntgHourStr = responseData.getStckCntgHour();
                            LocalTime stckCntgHour = LocalTime.parse(stckCntgHourStr, DateTimeFormatter.ofPattern("HHmmss"));

                            // stck_cntg_hour가 3시 30분보다 크면 중단
                            if (stckCntgHour.isAfter(LocalTime.of(15, 30)) || stckCntgHour.isAfter(LocalTime.now())) {
                                continue;
                            }

                            responseDataList.add(responseData);
                        }

                        // 데이터를 시간순으로 정렬 (stck_cntg_hour 기준)
                        responseDataList.sort(Comparator.comparing(GetChartResponse::getStckCntgHour));
                    }
                } else {
                    throw new IllegalStateException("'output2' 필드는 배열이 아닙니다.");
                }
            } else {
                throw new IllegalStateException("'output2' field is missing in the response");
            }

            return Mono.just(responseDataList);
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            return Mono.error(e);
        }
    }

    // 9시부터 현재 시각까지 30분 단위 범위를 계산하는 함수
    private int getCurrent30MinuteRange() {
        LocalTime currentTime = LocalTime.now().plusMinutes(30);
        LocalTime startTime = LocalTime.of(9, 30);  // 9시 시작
        LocalTime endTime = LocalTime.of(15, 30);  // 16시 종료

        // 현재 시간이 16시 이후라면 16시까지만 계산
        if (currentTime.isAfter(endTime)) {
            currentTime = endTime;
        }

        return (int) Duration.between(startTime, currentTime).toMinutes() / 30;  // 30분 단위로 범위 계산
    }

    private String getJsonNodeValue(JsonNode node, String key) {
        JsonNode valueNode = node.get(key);
        return valueNode != null ? valueNode.asText(null) : null;
    }


    public Mono<List<StockPriceResponse>> getStockPrice(String stockCode) {
        HttpHeaders headers = createHeader2();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/uapi/domestic-stock/v1/quotations/inquire-price")
                        .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                        .queryParam("FID_INPUT_ISCD", stockCode)
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this::parseStockPrice);
    }

    private Mono<List<StockPriceResponse>> parseStockPrice(String response) {
        try {
            List<StockPriceResponse> responseDataList = new ArrayList<>();
            JsonNode rootNode = objectMapper.readTree(response);

            // output 필드가 있는지 확인
            if (rootNode.has("output")) {
                JsonNode outputNode = rootNode.get("output");

                // output 필드가 null이 아닌지 확인하고, 필요한 데이터 추출
                if (outputNode != null) {
                    StockPriceResponse responseData = StockPriceResponse.builder()
                            .acmlTrPbmn(getJsonNodeValue(outputNode, "acml_tr_pbmn"))
                            .acmlVol(getJsonNodeValue(outputNode, "acml_vol"))
                            .prdyCtrt(getJsonNodeValue(outputNode, "prdy_ctrt"))
                            .prdyVrss(getJsonNodeValue(outputNode, "prdy_vrss"))
                            .stckPrpr(getJsonNodeValue(outputNode, "stck_prpr"))
                            .stckHgpr(getJsonNodeValue(outputNode, "stck_hgpr"))
                            .stckLwpr(getJsonNodeValue(outputNode, "stck_lwpr"))
                            .build();
                    responseDataList.add(responseData);
                }
            } else {
                throw new IllegalStateException("'output' field is missing in the response");
            }

            return Mono.just(responseDataList);
        } catch (Exception e) {
            return Mono.error(e);
        }
    }

}
