package com.inm.service.impl;

import com.inm.dto.commonResponses.PageResponse;
import com.inm.dto.customer.CustomerDashboardDTO;
import com.inm.dto.customer.CustomerDropdownDTO;
import com.inm.dto.customer.CustomerRequestDTO;
import com.inm.dto.customer.CustomerResponseDTO;
import com.inm.entity.Customer;
import com.inm.enums.CustomerStatus;
import com.inm.enums.ItemStatus;
import com.inm.exception.DuplicateResourceException;
import com.inm.exception.ResourceNotFoundException;
import com.inm.mapper.CustomerMapper;
import com.inm.repository.CustomerRepository;
import com.inm.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;
    private final CustomerMapper mapper;

    @Override
    public CustomerResponseDTO createCustomer(CustomerRequestDTO request) {

        System.out.println("Language from Request = " + request.getCustomerLanguage());

        if (repository.existsByEmailAndIsDeletedFalse(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        Customer customer = mapper.toEntity(request);
        System.out.println("Language after Mapper = " + customer.getCustomerLanguage());

        customer.setIsDeleted(false);

        if (customer.getStatus() == null) {
            customer.setStatus(request.getStatus());
        }

        Customer savedCustomer = repository.save(customer);

        System.out.println("Language after Save = " + savedCustomer.getCustomerLanguage());

        return mapper.toDTO(savedCustomer);
    }

    @Override
    public CustomerResponseDTO updateCustomer(Long id,
                                              CustomerRequestDTO request) {

        Customer customer = repository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        // Optional: Check duplicate email when updating
        if (!customer.getEmail().equals(request.getEmail())
                && repository.existsByEmailAndIsDeletedFalse(request.getEmail())) {

            throw new DuplicateResourceException("Email already exists.");
        }

        mapper.updateEntity(request, customer);

        if (request.getStatus() != null) {
            customer.setStatus(request.getStatus());
        }

        Customer updatedCustomer = repository.save(customer);

        return mapper.toDTO(updatedCustomer);
    }

    @Override
    public CustomerResponseDTO getCustomerById(Long id) {

        Customer customer = repository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        return mapper.toDTO(customer);
    }


    @Override
    public PageResponse<CustomerResponseDTO> getCustomers(
            String search,
            int page,
            int size,
            String sortBy,
            String direction,
            CustomerStatus status
    ) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Customer> customerPage;

        if (status == CustomerStatus.ALL) {
            customerPage = repository.searchCustomers(search, pageable);
        } else {
            customerPage = repository.searchCustomersByStatus(
                    status,
                    search,
                    pageable
            );
        }

        List<CustomerResponseDTO> content = customerPage
                .stream()
                .map(mapper::toDTO)
                .toList();

        return PageResponse.<CustomerResponseDTO>builder()
                .content(content)
                .page(customerPage.getNumber())
                .size(customerPage.getSize())
                .totalElements(customerPage.getTotalElements())
                .totalPages(customerPage.getTotalPages())
                .first(customerPage.isFirst())
                .last(customerPage.isLast())
                .build();
    }



    @Override
    public void deleteCustomer(Long id) {

        Customer customer = repository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        customer.setIsDeleted(true);

        repository.save(customer);
    }

    @Override
    public void restoreCustomer(Long id) {

        Customer customer = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        customer.setIsDeleted(false);

        repository.save(customer);
    }

    @Override
    public List<CustomerDropdownDTO> getCustomerDropdown() {

        return repository.findByIsDeletedFalseOrderByDisplayNameAsc()
                .stream()
                .map(customer -> CustomerDropdownDTO.builder()
                        .id(customer.getId())
                        .displayName(customer.getDisplayName())
                        .build())
                .toList();
    }

    @Override
    public Long getCustomerCount() {

        return repository.countByIsDeletedFalse();
    }

    @Override
    public CustomerDashboardDTO getDashboard() {

        long total = repository.countByIsDeletedFalse();

        long business = repository.countByCustomerTypeAndIsDeletedFalse("Business");

        long individual = repository.countByCustomerTypeAndIsDeletedFalse("Individual");

        return CustomerDashboardDTO.builder()
                .totalCustomers(total)
                .businessCustomers(business)
                .individualCustomers(individual)
                .activeCustomers(total)
                .build();
    }

    @Override
    public Boolean checkEmailExists(String email) {

        return repository.existsByEmailAndIsDeletedFalse(email);
    }
}