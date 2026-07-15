package com.inm.service.impl;

import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.invoice.request.InvoiceItemRequest;
import com.inm.dto.invoice.request.InvoiceRequest;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.dto.invoice.response.InvoiceResponse;
import com.inm.entity.*;
import com.inm.enums.InvoiceStatus;
import com.inm.exception.ResourceNotFoundException;
import com.inm.mapper.InvoiceItemMapper;
import com.inm.mapper.InvoiceMapper;
import com.inm.repository.*;
import com.inm.service.EmailService;
import com.inm.service.ExchangeRateService;
import com.inm.service.InvoiceService;
import com.inm.service.PdfService;
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
import java.util.Optional;

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

    private final TaxMasterRepository taxMasterRepository;

    private final ExchangeRateService exchangeRateService;


    // Optional Services
    private final EmailService emailService;
    private final PdfService pdfService;

    @Override
    public InvoiceResponse create(InvoiceRequest request) {

        Invoice invoice = invoiceMapper.toEntity(request);

        invoice.setInvoiceNumber(generateInvoiceNumber());

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        SalesPerson salesPerson = salesPersonRepository.findById(request.getSalesPersonId())
                .orElseThrow(() -> new ResourceNotFoundException("Sales Person not found"));

        invoice.setCustomer(customer);
        invoice.setSalesPerson(salesPerson);

        if (request.getTaxMasterId() != null) {
            TaxMaster taxMaster = taxMasterRepository.findById(request.getTaxMasterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Tax not found"));

            invoice.setTaxMaster(taxMaster);
        }

        invoice.setInvoiceStatus(
                request.getInvoiceStatus() != null
                        ? request.getInvoiceStatus()
                        : InvoiceStatus.ACTIVE
        );

        if (request.getCurrency() == null) {
            request.setCurrency("INR");
        }

        if (request.getCurrency() == null || request.getCurrency().isBlank()) {
            request.setCurrency("INR");
        }

        BigDecimal exchangeRate;

        if ("INR".equalsIgnoreCase(request.getCurrency())) {
            exchangeRate = BigDecimal.ONE;
        } else {
            exchangeRate = exchangeRateService.getExchangeRate(
                    request.getCurrency(),
                    "INR",
                    request.getInvoiceDate()
            );
        }

        invoice.setCurrency(request.getCurrency());
        invoice.setExchangeRate(exchangeRate);

        prepareInvoiceItems(invoice, request.getItems());

        calculateInvoiceTotals(invoice);

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
        invoice.setInvoiceStatus(request.getInvoiceStatus());

        if (invoice.getInvoiceStatus() == null) {
            invoice.setInvoiceStatus(InvoiceStatus.ACTIVE);
        }

        if (request.getCurrency() == null || request.getCurrency().isBlank()) {
            request.setCurrency("INR");
        }

        BigDecimal exchangeRate;

        if ("INR".equalsIgnoreCase(request.getCurrency())) {
            exchangeRate = BigDecimal.ONE;
        } else {
            exchangeRate = exchangeRateService.getExchangeRate(
                    request.getCurrency(),
                    "INR",
                    request.getInvoiceDate()
            );
        }

        invoice.setCurrency(request.getCurrency());
        invoice.setExchangeRate(exchangeRate);


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
    public Page<InvoiceResponse> searchInvoiceByStatus(
            InvoiceStatus invoiceStatus,
            String search,
            Pageable pageable) {

        return invoiceRepository
                .searchInvoiceByStatus(invoiceStatus, search, pageable)
                .map(invoiceMapper::toResponse);
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

    // =====================================
    // Duplicate Invoice
    // =====================================

    @Override
    public InvoiceResponse duplicateInvoice(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        Invoice duplicate = new Invoice();

        duplicate.setInvoiceNumber(generateInvoiceNumber());

        duplicate.setInvoiceDate(LocalDate.now());
        duplicate.setDueDate(invoice.getDueDate());

        duplicate.setTerms(invoice.getTerms());
        duplicate.setSubject(invoice.getSubject());
        duplicate.setCustomerNotes(invoice.getCustomerNotes());
        duplicate.setOrderNumber(invoice.getOrderNumber());

        duplicate.setCustomer(invoice.getCustomer());
        duplicate.setSalesPerson(invoice.getSalesPerson());

        duplicate.setSubTotal(invoice.getSubTotal());
        duplicate.setTaxAmount(invoice.getTaxAmount());
        duplicate.setTotalAmount(invoice.getTotalAmount());

        duplicate.setInvoiceStatus(InvoiceStatus.DRAFT);

        List<InvoiceItem> items = new ArrayList<>();

        for (InvoiceItem oldItem : invoice.getItems()) {

            InvoiceItem newItem = new InvoiceItem();

            newItem.setInvoice(duplicate);
            newItem.setItem(oldItem.getItem());
            newItem.setDescription(oldItem.getDescription());
            newItem.setQuantity(oldItem.getQuantity());
            newItem.setRate(oldItem.getRate());
            newItem.setDiscount(oldItem.getDiscount());
            newItem.setTaxPercent(oldItem.getTaxPercent());
            newItem.setAmount(oldItem.getAmount());

            items.add(newItem);
        }

        duplicate.setItems(items);

        Invoice saved = invoiceRepository.save(duplicate);

        return invoiceMapper.toResponse(saved);
    }


    @Override
    public InvoiceResponse saveDraft(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        invoice.setInvoiceStatus(InvoiceStatus.DRAFT);

        return invoiceMapper.toResponse(invoiceRepository.save(invoice));
    }

    @Override
    public InvoiceResponse cancelInvoice(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        invoice.setInvoiceStatus(InvoiceStatus.CANCELLED);

        return invoiceMapper.toResponse(invoiceRepository.save(invoice));
    }


    @Override
    public InvoiceResponse activateInvoice(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        invoice.setInvoiceStatus(InvoiceStatus.ACTIVE);

        return invoiceMapper.toResponse(invoiceRepository.save(invoice));
    }


    @Override
    public InvoiceResponse markOverdue(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        invoice.setInvoiceStatus(InvoiceStatus.OVERDUE);

        return invoiceMapper.toResponse(invoiceRepository.save(invoice));
    }

    @Override
    public InvoiceResponse updateStatus(Long id, InvoiceStatus status) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        invoice.setInvoiceStatus(status);

        return invoiceMapper.toResponse(invoiceRepository.save(invoice));
    }


    // =====================================
    // Send Invoice
    // =====================================

    @Override
    public InvoiceResponse sendInvoice(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        byte[] pdf = pdfService.generateInvoicePdf(invoice);

        emailService.sendInvoice(
                invoice.getCustomer().getEmail(),
                "Invoice " + invoice.getInvoiceNumber(),
                pdf
        );

        invoice.setInvoiceStatus(InvoiceStatus.SENT);

        invoiceRepository.save(invoice);

        return invoiceMapper.toResponse(invoice);
    }

    // =====================================
    // Mark Paid
    // =====================================

    @Override
    public InvoiceResponse markInvoiceAsPaid(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        if (invoice.getInvoiceStatus() == InvoiceStatus.DRAFT) {
            throw new IllegalStateException("Draft invoice cannot be marked as PAID");
        }

        invoice.setInvoiceStatus(InvoiceStatus.PAID);

        invoiceRepository.save(invoice);

        return invoiceMapper.toResponse(invoice);
    }

    // =====================================
    // Email Invoice
    // =====================================

    @Override
    public void emailInvoice(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        byte[] pdf = pdfService.generateInvoicePdf(invoice);

        emailService.sendInvoice(
                invoice.getCustomer().getEmail(),
                "Invoice " + invoice.getInvoiceNumber(),
                pdf
        );
    }

    // =====================================
    // Download PDF
    // =====================================

    @Override
    public byte[] downloadInvoicePdf(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));

        return pdfService.generateInvoicePdf(invoice);
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

        for (InvoiceItemRequest dto : itemRequests) {

            if (dto.getItemId() == null) {
                throw new ResourceNotFoundException("Item ID is missing");
            }

            ItemMaster itemMaster = itemMasterRepository.findById(dto.getItemId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Item not found. ID: " + dto.getItemId()));

            InvoiceItem item = new InvoiceItem();

            item.setInvoice(invoice);
            item.setItem(itemMaster);

            item.setDescription(
                    dto.getDescription() != null
                            ? dto.getDescription()
                            : itemMaster.getItemName()
            );

            item.setQuantity(dto.getQuantity());
            item.setRate(dto.getRate());

            BigDecimal discount = dto.getDiscount() != null
                    ? dto.getDiscount()
                    : BigDecimal.ZERO;

            item.setDiscount(discount);

            item.setTaxPercent(dto.getTaxPercent());

            BigDecimal quantity = dto.getQuantity() != null
                    ? dto.getQuantity()
                    : BigDecimal.ZERO;

            BigDecimal rate = dto.getRate() != null
                    ? dto.getRate()
                    : BigDecimal.ZERO;

            BigDecimal amount = quantity.multiply(rate);

            amount = amount.subtract(discount);

            if (amount.compareTo(BigDecimal.ZERO) < 0) {
                amount = BigDecimal.ZERO;
            }

            amount = amount.setScale(2, RoundingMode.HALF_UP);

            item.setAmount(amount);

            subTotal = subTotal.add(amount);

            invoiceItems.add(item);
        }

        invoice.setItems(invoiceItems);
        invoice.setSubTotal(subTotal);
    }

    private void calculateInvoiceTotals(Invoice invoice) {

        BigDecimal subTotal = invoice.getSubTotal() != null
                ? invoice.getSubTotal()
                : BigDecimal.ZERO;

        BigDecimal discount = invoice.getDiscountAmount() != null
                ? invoice.getDiscountAmount()
                : BigDecimal.ZERO;

        BigDecimal shipping = invoice.getShippingCharges() != null
                ? invoice.getShippingCharges()
                : BigDecimal.ZERO;

        BigDecimal adjustment = invoice.getAdjustment() != null
                ? invoice.getAdjustment()
                : BigDecimal.ZERO;

        BigDecimal taxAmount = BigDecimal.ZERO;

        if (invoice.getTaxMaster() != null) {

            BigDecimal taxRate = invoice.getTaxMaster().getTaxRate();

            if (taxRate != null) {

                taxAmount = subTotal
                        .subtract(discount)
                        .multiply(taxRate)
                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            }
        }

        invoice.setTaxAmount(taxAmount);

        BigDecimal total = subTotal
                .subtract(discount)
                .add(taxAmount)
                .add(shipping)
                .add(adjustment);

        invoice.setTotalAmount(total);
    }

    @Override
    public String generateInvoiceNumber() {

        int year = LocalDate.now().getYear();
        String prefix = "INV" + year + "-";

        Optional<Invoice> latestInvoice =
                invoiceRepository.findTopByInvoiceNumberStartingWithOrderByInvoiceNumberDesc(prefix);

        int nextNumber = 1;

        if (latestInvoice.isPresent()) {
            String lastInvoiceNumber = latestInvoice.get().getInvoiceNumber();
            String sequence = lastInvoiceNumber.substring(prefix.length());
            nextNumber = Integer.parseInt(sequence) + 1;
        }

        return prefix + String.format("%04d", nextNumber);
    }
}