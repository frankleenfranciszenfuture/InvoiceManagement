package com.inm.dto.invoice.response;

import com.inm.InvoiceStatus;
import com.inm.dto.customer.CustomerDTO;
import com.inm.entity.Customer;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class InvoiceResponse {

    private Long id;

    private String invoiceNumber;

    private Long customerId;
    private String customerName;
    private String customerEmail;

    private Long salesPersonId;
    private String salesPersonName;

    private LocalDate invoiceDate;
    private LocalDate dueDate;

    private String terms;
    private String subject;
    private String customerNotes;
    private String orderNumber;

    private BigDecimal subTotal;
    private BigDecimal taxAmount;
    private BigDecimal totalAmount;

    private List<InvoiceItemResponse> items;

    private InvoiceStatus status;

}