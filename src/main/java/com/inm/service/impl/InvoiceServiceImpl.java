package com.inm.service.impl;

import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.invoice.request.InvoiceItemRequest;
import com.inm.dto.invoice.request.InvoiceRequest;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.dto.invoice.response.InvoiceResponse;
import com.inm.entity.*;
import com.inm.enums.CustomerStatus;
import com.inm.enums.InvoiceStatus;
import com.inm.enums.ItemStatus;
import com.inm.exception.ResourceNotFoundException;
import com.inm.mapper.InvoiceItemMapper;
import com.inm.mapper.InvoiceMapper;
import com.inm.repository.CustomerRepository;
import com.inm.repository.InvoiceRepository;
import com.inm.repository.ItemMasterRepository;
import com.inm.repository.SalesPersonRepository;
import com.inm.service.InvoiceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    private final CustomerRepository customerRepository;

    private final SalesPersonRepository salesPersonRepository;

    private final ItemMasterRepository itemMasterRepository;

    private final InvoiceMapper invoiceMapper;

    private final InvoiceItemMapper invoiceItemMapper;


    @Override
    public InvoiceResponse create(InvoiceRequest request) {

        Invoice invoice = invoiceMapper.toEntity(request);

        invoice.setInvoiceNumber(generateInvoiceNumber());

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        SalesPerson salesPerson = salesPersonRepository.findById(request.getSalesPersonId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Sales Person not found"));

        invoice.setCustomer(customer);
        invoice.setSalesPerson(salesPerson);

        if (invoice.getInvoiceStatus() == null) {
            invoice.setInvoiceStatus(InvoiceStatus.ACTIVE);
        }

        prepareInvoiceItems(invoice, request.getItems());

        Invoice savedInvoice = invoiceRepository.save(invoice);

        return invoiceMapper.toResponse(savedInvoice);

    }

    @Override
    public InvoiceResponse update(Long id, InvoiceRequest request) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        invoice.setInvoiceNumber(request.getInvoiceNumber());
        invoice.setInvoiceDate(request.getInvoiceDate());
        invoice.setDueDate(request.getDueDate());
        invoice.setTerms(request.getTerms());
        invoice.setSubject(request.getSubject());
        invoice.setCustomerNotes(request.getCustomerNotes());
        invoice.setOrderNumber(request.getOrderNumber());

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        SalesPerson salesPerson = salesPersonRepository.findById(request.getSalesPersonId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Sales Person not found"));

        invoice.setCustomer(customer);
        invoice.setSalesPerson(salesPerson);

        if (invoice.getInvoiceStatus() == null) {
            invoice.setInvoiceStatus(InvoiceStatus.ACTIVE);
        }


        prepareInvoiceItems(invoice, request.getItems());

        return invoiceMapper.toResponse(invoiceRepository.save(invoice));
    }


    @Override
    @Transactional(readOnly = true)
    public InvoiceResponse getById(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found with id: " + id));

        return invoiceMapper.toResponse(invoice);
    }


    @Override
    @Transactional(readOnly = true)
    public PageResponse<InvoiceResponse> getInvoices(
            String search,
            int page,
            int size,
            String sortBy,
            String direction,
            InvoiceStatus invoiceStatus) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Invoice> invoicePage;

        if (invoiceStatus == InvoiceStatus.ALL) {
            invoicePage = invoiceRepository.searchInvoices(search, pageable);
        } else {
            invoicePage = invoiceRepository.searchInvoiceByStatus(
                    invoiceStatus,
                    search,
                    pageable
            );
        }

        List<InvoiceResponse> invoices = invoicePage
                .stream()
                .map(invoiceMapper::toResponse)
                .toList();

        return PageResponse.<InvoiceResponse>builder()
                .content(invoices)
                .page(invoicePage.getNumber())
                .size(invoicePage.getSize())
                .totalElements(invoicePage.getTotalElements())
                .totalPages(invoicePage.getTotalPages())
                .first(invoicePage.isFirst())
                .last(invoicePage.isLast())
                .build();
    }


    @Override
    @Transactional(readOnly = true)
    public PageResponse<InvoiceResponse> getCustomerInvoices(
            Long customerId,
            String search,
            int page,
            int size,
            String sortBy,
            String direction) {

        // Validate customer exists
        customerRepository.findByIdAndIsDeletedFalse(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Invoice> invoicePage = invoiceRepository.searchCustomerInvoices(
                customerId,
                search,
                pageable
        );

        List<InvoiceResponse> invoices = invoicePage.getContent()
                .stream()
                .map(invoiceMapper::toResponse)
                .toList();

        return PageResponse.<InvoiceResponse>builder()
                .content(invoices)
                .page(invoicePage.getNumber())
                .size(invoicePage.getSize())
                .totalElements(invoicePage.getTotalElements())
                .totalPages(invoicePage.getTotalPages())
                .first(invoicePage.isFirst())
                .last(invoicePage.isLast())
                .build();
    }


    @Override
    @Transactional(readOnly = true)
    public InvoiceItemResponse getItemById(Long invoiceId, Long itemId) {

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        InvoiceItem item = invoice.getItems()
                .stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice Item not found"));

        return invoiceItemMapper.toResponse(item);
    }


    @Override
    @Transactional(readOnly = true)
    public List<InvoiceItemResponse> getAllItems(Long invoiceId) {

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        return invoice.getItems()
                .stream()
                .map(invoiceItemMapper::toResponse)
                .toList();
    }



    @Override
    public void delete(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        invoiceRepository.delete(invoice);
    }



    private void prepareInvoiceItems(
            Invoice invoice,
            List<InvoiceItemRequest> itemRequests
    ) {

        if (itemRequests == null || itemRequests.isEmpty()) {
            throw new ResourceNotFoundException("Invoice items cannot be empty");
        }

        List<InvoiceItem> invoiceItems = new ArrayList<>();

        BigDecimal subTotal = BigDecimal.ZERO;
        BigDecimal taxAmount = BigDecimal.ZERO;

        for (InvoiceItemRequest dto : itemRequests) {

            if (dto.getItemId() == null) {
                throw new ResourceNotFoundException("Item ID is missing");
            }

            ItemMaster itemMaster = itemMasterRepository.findById(dto.getItemId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Item not found. ID: " + dto.getItemId()));

            InvoiceItem item = new InvoiceItem();

            item.setItem(itemMaster);
            item.setInvoice(invoice);
            item.setDescription(dto.getDescription());
            item.setQuantity(dto.getQuantity());
            item.setRate(dto.getRate());
            item.setDiscount(dto.getDiscount());
            item.setTaxPercent(dto.getTaxPercent());
            item.setDescription(itemMaster.getItemName());

            BigDecimal quantity = dto.getQuantity() != null ? dto.getQuantity() : BigDecimal.ZERO;
            BigDecimal rate = dto.getRate() != null ? dto.getRate() : BigDecimal.ZERO;


            BigDecimal amount = quantity.multiply(rate);

            if (dto.getDiscount() != null &&
                    dto.getDiscount().compareTo(BigDecimal.ZERO) > 0) {

                amount = amount.setScale(2, RoundingMode.HALF_UP);
            }

            item.setAmount(amount);

            subTotal = subTotal.add(amount);

            invoice.setTotalAmount(subTotal.add(taxAmount));

            if (dto.getTaxPercent() != null && dto.getTaxPercent().compareTo(BigDecimal.ZERO) > 0) {

                BigDecimal tax = amount
                        .multiply(dto.getTaxPercent())
                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

                taxAmount = taxAmount.add(tax);
            }

            invoiceItems.add(item);
        }

        invoice.setItems(invoiceItems);
        invoice.setSubTotal(subTotal);
        invoice.setTaxAmount(taxAmount);
        invoice.setTotalAmount(subTotal.add(taxAmount));
    }

    @Override
    public String generateInvoiceNumber() {

        int year = LocalDate.now().getYear();

        String prefix = "INV" + year + "-";

        String lastInvoice = invoiceRepository.findLastInvoiceNumber(prefix);

        int next = 1;

        if (lastInvoice != null && !lastInvoice.isBlank()) {
            String number = lastInvoice.substring(prefix.length());
            next = Integer.parseInt(number) + 1;
        }

        return prefix + String.format("%04d", next);
    }
}