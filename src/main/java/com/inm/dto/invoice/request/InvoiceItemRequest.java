package com.inm.dto.invoice.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceItemRequest {

    private Long itemId;

    private String description;

    private BigDecimal quantity;
    private BigDecimal rate;
    private BigDecimal discount;
    private BigDecimal taxPercent;
}