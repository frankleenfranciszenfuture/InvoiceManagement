package com.inm.service;

import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.invoice.request.InvoiceRequest;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.dto.invoice.response.InvoiceResponse;
import com.inm.enums.InvoiceStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InvoiceService {

    InvoiceResponse create(InvoiceRequest request);

    InvoiceResponse update(Long id, InvoiceRequest request);

    InvoiceResponse getById(Long id);

    String generateInvoiceNumber();

    PageResponse<InvoiceResponse> getInvoices(
            String search,
            int page,
            int size,
            String sortBy,
            String direction,
            InvoiceStatus invoiceStatus);

    Page<InvoiceResponse> searchInvoiceByStatus(
            InvoiceStatus invoiceStatus,
            String search,
            Pageable pageable);

    PageResponse<InvoiceResponse> getCustomerInvoices(
            Long customerId,
            String search,
            int page,
            int size,
            String sortBy,
            String direction);


    InvoiceItemResponse getItemById(Long invoiceId, Long itemId);

    List<InvoiceItemResponse> getAllItems(Long invoiceId);

    void delete(Long id);

    // ==========================
    // Invoice Actions
    // ==========================

    InvoiceResponse duplicateInvoice(Long id);

    InvoiceResponse saveDraft(Long id);

    InvoiceResponse cancelInvoice(Long id);

    InvoiceResponse activateInvoice(Long id);

    InvoiceResponse markOverdue(Long id);

    InvoiceResponse updateStatus(Long id, InvoiceStatus status);

    InvoiceResponse sendInvoice(Long id);

    InvoiceResponse markInvoiceAsPaid(Long id);

    void emailInvoice(Long id);

    byte[] downloadInvoicePdf(Long id);


}