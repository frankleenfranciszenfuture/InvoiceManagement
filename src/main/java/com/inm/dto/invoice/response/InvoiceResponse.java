package com.inm.dto.invoice.response;

import com.inm.dto.customer.CustomerResponseDTO;
import com.inm.dto.salesPerson.SalesPersonResponse;
import com.inm.enums.InvoiceStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class InvoiceResponse {

    private Long id;

    private String invoiceNumber;

    private LocalDate invoiceDate;

    private LocalDate dueDate;

    private String subject;

    private String customerNotes;

    private String terms;

    private String orderNumber;

    private String referenceNumber;

    private String currency;

    private BigDecimal exchangeRate;

    private CustomerResponseDTO customer;

    private SalesPersonResponse salesPerson;

    private List<InvoiceItemResponse> items;

    private BigDecimal subTotal;

    private BigDecimal discountAmount;

    private BigDecimal taxAmount;

    private BigDecimal shippingCharges;

    private BigDecimal adjustment;

    private BigDecimal totalAmount;

    private InvoiceStatus invoiceStatus;

    private Boolean emailSent;

    private LocalDate emailSentDate;

    private LocalDate paidDate;

    private BigDecimal paidAmount;

    private Boolean pdfGenerated;

    private LocalDate createdDate;

    private LocalDate updatedDate;

}