package com.inm.controller.customer;

import com.inm.dto.commonResponses.ApiResponse;
import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.customer.CustomerDashboardDTO;
import com.inm.dto.customer.CustomerDropdownDTO;
import com.inm.dto.customer.CustomerRequestDTO;
import com.inm.dto.customer.CustomerResponseDTO;
import com.inm.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService customerService;

    /**
     * Create Customer
     */
    @PostMapping
    public ResponseEntity<ApiResponse<CustomerResponseDTO>> createCustomer(
            @Valid @RequestBody CustomerRequestDTO request) {

        CustomerResponseDTO response = customerService.createCustomer(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Customer created successfully.",
                        response));
    }

    /**
     * Get All Customers (Pagination + Search + Sorting)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CustomerResponseDTO>>> getCustomers(

            @RequestParam(defaultValue = "") String search,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "displayName") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        PageResponse<CustomerResponseDTO> response =
                customerService.getCustomers(
                        search,
                        page,
                        size,
                        sortBy,
                        direction);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customers fetched successfully.",
                        response));
    }

    /**
     * Get Customer By Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerResponseDTO>> getCustomerById(
            @PathVariable Long id) {

        CustomerResponseDTO response =
                customerService.getCustomerById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer fetched successfully.",
                        response));
    }

    /**
     * Update Customer
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerResponseDTO>> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequestDTO request) {

        CustomerResponseDTO response =
                customerService.updateCustomer(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer updated successfully.",
                        response));
    }

    /**
     * Soft Delete Customer
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer deleted successfully.",
                        null));
    }

    /**
     * Restore Customer
     */
    @PatchMapping("/{id}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreCustomer(
            @PathVariable Long id) {

        customerService.restoreCustomer(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer restored successfully.",
                        null));
    }

    /**
     * Customer Dropdown
     */
    @GetMapping("/dropdown")
    public ResponseEntity<ApiResponse<List<CustomerDropdownDTO>>> getDropdown() {

        List<CustomerDropdownDTO> response =
                customerService.getCustomerDropdown();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer dropdown fetched successfully.",
                        response));
    }

    /**
     * Customer Count
     */
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> getCustomerCount() {

        Long count = customerService.getCustomerCount();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer count fetched successfully.",
                        count));
    }

    /**
     * Dashboard Summary
     */
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<CustomerDashboardDTO>> getDashboard() {

        CustomerDashboardDTO response =
                customerService.getDashboard();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Dashboard fetched successfully.",
                        response));
    }

    /**
     * Check Email Exists
     */
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmail(
            @RequestParam String email) {

        Boolean exists = customerService.checkEmailExists(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Email checked successfully.",
                        exists));
    }
}
