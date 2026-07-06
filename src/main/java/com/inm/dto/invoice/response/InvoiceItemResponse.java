package com.inm.dto.invoice.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceItemResponse {

    private Long id;

    private Long invoiceId;

    private Long itemId;

    private String itemName;

    private String description;
    private BigDecimal quantity;
    private BigDecimal rate;
    private BigDecimal discount;
    private BigDecimal taxPercent;
    private BigDecimal amount;
}