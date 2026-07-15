package com.inm.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inm.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class ExchangeRateServiceImpl implements ExchangeRateService {

    private final RestClient restClient = RestClient.create();

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public BigDecimal getExchangeRate(
            String fromCurrency,
            String toCurrency,
            LocalDate date) {

        if (fromCurrency.equalsIgnoreCase(toCurrency)) {
            return BigDecimal.ONE;
        }

        String url;

        if (date != null) {
            url = String.format(
                    "https://api.frankfurter.dev/v1/%s?base=%s&symbols=%s",
                    date,
                    fromCurrency,
                    toCurrency
            );
        } else {
            url = String.format(
                    "https://api.frankfurter.dev/v1/latest?base=%s&symbols=%s",
                    fromCurrency,
                    toCurrency
            );
        }

        String response = restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);

        try {
            JsonNode root = mapper.readTree(response);

            JsonNode rate = root.path("rates").path(toCurrency);

            if (rate.isMissingNode() || rate.isNull()) {
                throw new RuntimeException("Rate not found: " + response);
            }

            return rate.decimalValue();

        } catch (Exception e) {
            throw new RuntimeException("Unable to fetch exchange rate. Response: " + response, e);
        }
    }


    @Override
    public Map<String, String> getCurrencies() {

        String response = restClient.get()
                .uri("https://api.frankfurter.dev/v1/currencies")
                .retrieve()
                .body(String.class);

        try {
            return mapper.readValue(
                    response,
                    new TypeReference<Map<String, String>>() {}
            );
        } catch (Exception e) {
            throw new RuntimeException("Unable to fetch currencies", e);
        }
    }
}