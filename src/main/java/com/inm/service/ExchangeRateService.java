package com.inm.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

public interface ExchangeRateService {

    BigDecimal getExchangeRate(
            String fromCurrency,
            String toCurrency,
            LocalDate date
    );

    Map<String, String> getCurrencies();
}