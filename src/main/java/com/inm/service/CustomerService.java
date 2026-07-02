package com.inm.service;

import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.customer.CustomerDashboardDTO;
import com.inm.dto.customer.CustomerDropdownDTO;
import com.inm.dto.customer.CustomerRequestDTO;
import com.inm.dto.customer.CustomerResponseDTO;

import java.util.List;

public interface CustomerService {

    CustomerResponseDTO createCustomer(CustomerRequestDTO request);

    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO request);

    CustomerResponseDTO getCustomerById(Long id);

    PageResponse<CustomerResponseDTO> getCustomers(
            String search,
            int page,
            int size,
            String sortBy,
            String direction);

    void deleteCustomer(Long id);

    void restoreCustomer(Long id);

    List<CustomerDropdownDTO> getCustomerDropdown();

    Long getCustomerCount();

    CustomerDashboardDTO getDashboard();

    Boolean checkEmailExists(String email);
}
