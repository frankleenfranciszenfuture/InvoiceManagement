package com.inm.service;

import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.invoice.request.InvoiceRequest;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.dto.invoice.response.InvoiceResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InvoiceService {

    InvoiceResponse create(InvoiceRequest request);

    InvoiceResponse update(Long id, InvoiceRequest request);

    InvoiceResponse getById(Long id);

    PageResponse<InvoiceResponse> getInvoices(
            String search,
            int page,
            int size,
            String sortBy,
            String direction);

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
}