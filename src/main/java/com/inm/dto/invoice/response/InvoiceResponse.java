package com.inm.dto.invoice.response;

import com.inm.dto.customer.CustomerResponseDTO;
import com.inm.dto.salesPerson.SalesPersonResponse;
import com.inm.enums.InvoiceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

    // Currency Details
    private String currency;
    private BigDecimal exchangeRate;

    // Customer
    private CustomerResponseDTO customer;

    // Sales Person
    private SalesPersonResponse salesPerson;

    // Invoice Items
    private List<InvoiceItemResponse> items;

    // Amount Details
    private BigDecimal subTotal;

    private BigDecimal discountAmount;

    private BigDecimal taxAmount;

    private BigDecimal shippingCharges;

    private BigDecimal adjustment;

    private BigDecimal totalAmount;

    // Tax Details
    private Long taxMasterId;

    private String taxName;

    private String taxType;

    private BigDecimal taxRate;

    // Status
    private InvoiceStatus invoiceStatus;

    // Email
    private Boolean emailSent;
    private LocalDate emailSentDate;

    // Payment
    private BigDecimal paidAmount;
    private LocalDate paidDate;

    // PDF
    private Boolean pdfGenerated;

    // Audit
    private LocalDate createdDate;
    private LocalDate updatedDate;
}