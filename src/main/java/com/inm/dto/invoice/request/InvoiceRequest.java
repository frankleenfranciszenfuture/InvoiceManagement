package com.inm.dto.invoice.request;

import com.inm.enums.InvoiceStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class InvoiceRequest {

    private String invoiceNumber;

    @NotNull
    private LocalDate invoiceDate;

    private LocalDate dueDate;

    private String subject;

    private String customerNotes;

    private String terms;

    private String orderNumber;

    private String referenceNumber;

    private String currency;

    private BigDecimal exchangeRate;

    @NotNull
    private Long customerId;

    private Long salesPersonId;

    @Valid
    private List<InvoiceItemRequest> items;

    private BigDecimal subTotal;

    private BigDecimal discountAmount;

    private BigDecimal taxAmount;

    private BigDecimal shippingCharges;

    private BigDecimal adjustment;

    private BigDecimal totalAmount;

    private InvoiceStatus invoiceStatus;
}