package com.inm.controller.invoice;

import com.inm.dto.commonResponses.ApiResponse;
import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.invoice.request.InvoiceRequest;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.dto.invoice.response.InvoiceResponse;
import com.inm.entity.Invoice;
import com.inm.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InvoiceResponse create(@RequestBody InvoiceRequest request) {
        return invoiceService.create(request);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<PageResponse<InvoiceResponse>>> getCustomerInvoices(
            @PathVariable Long customerId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "invoiceDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        PageResponse<InvoiceResponse> response =
                invoiceService.getCustomerInvoices(
                        customerId,
                        search,
                        page,
                        size,
                        sortBy,
                        direction);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer invoices fetched successfully.",
                        response));
    }

    
    @PutMapping("/{id}")
    public InvoiceResponse update(@PathVariable Long id,
                                  @RequestBody InvoiceRequest request) {
        return invoiceService.update(id, request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> getById(@PathVariable Long id) {

        InvoiceResponse response = invoiceService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Invoice fetched successfully.",
                        response
                )
        );
    }


    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<InvoiceResponse>>> getInvoices(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "invoiceDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        PageResponse<InvoiceResponse> response =
                invoiceService.getInvoices(
                        search,
                        page,
                        size,
                        sortBy,
                        direction
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Invoices fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/{invoiceId}/items")
    public ResponseEntity<ApiResponse<List<InvoiceItemResponse>>> getAllItems(
            @PathVariable Long invoiceId) {

        List<InvoiceItemResponse> response =
                invoiceService.getAllItems(invoiceId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Invoice items fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/{invoiceId}/items/{itemId}")
    public ResponseEntity<ApiResponse<InvoiceItemResponse>> getItemById(
            @PathVariable Long invoiceId,
            @PathVariable Long itemId) {

        InvoiceItemResponse response =
                invoiceService.getItemById(invoiceId, itemId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Invoice item fetched successfully.",
                        response
                )
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        invoiceService.delete(id);
    }
}