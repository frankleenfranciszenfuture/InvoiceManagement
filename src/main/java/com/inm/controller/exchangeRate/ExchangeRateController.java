package com.inm.controller.exchangeRate;

import com.inm.dto.exchangeRate.ExchangeRateResponse;
import com.inm.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/exchange-rate")
@RequiredArgsConstructor
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    @GetMapping
    public ExchangeRateResponse getRate(

            @RequestParam String from,

            @RequestParam(defaultValue = "INR") String to,

            @RequestParam(required = false) LocalDate date) {

        if (date == null) {
            date = LocalDate.now();
        }

        BigDecimal rate = exchangeRateService.getExchangeRate(
                from,
                to,
                date
        );

        return new ExchangeRateResponse(
                from,
                to,
                date,
                rate
        );
    }

    @GetMapping("/currencies")
    public Map<String, String> getCurrencies() {
        return exchangeRateService.getCurrencies();
    }
}