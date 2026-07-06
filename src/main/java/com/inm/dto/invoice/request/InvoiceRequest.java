package com.inm.dto.invoice.request;

import com.inm.InvoiceStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class InvoiceRequest {

    private String invoiceNumber;

    private LocalDate invoiceDate;

    private LocalDate dueDate;

    private String terms;

    private String subject;

    private String customerNotes;

    private String orderNumber;

    private Long customerId;

    private Long salesPersonId;

    private List<InvoiceItemRequest> items;

    private InvoiceStatus status;
}