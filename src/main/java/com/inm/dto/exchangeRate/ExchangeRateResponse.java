package com.inm.dto.exchangeRate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRateResponse {

    private String fromCurrency;
    private String toCurrency;
    private LocalDate date;
    private BigDecimal exchangeRate;

}