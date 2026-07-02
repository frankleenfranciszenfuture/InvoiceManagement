package com.inm.repository;

import com.inm.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByIdAndIsDeletedFalse(Long id);

    boolean existsByEmailAndIsDeletedFalse(String email);

    @Query("""
            SELECT c
            FROM Customer c
            WHERE c.isDeleted = false
            AND (
                    :search IS NULL
                    OR :search = ''
                    OR LOWER(c.displayName) LIKE LOWER(CONCAT('%', :search, '%'))
                    OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%'))
                    OR LOWER(c.mobile) LIKE LOWER(CONCAT('%', :search, '%'))
                )
            """)
    Page<Customer> searchCustomers(
            String search,
            Pageable pageable);

    @Query("""
            SELECT c
            FROM Customer c
            WHERE c.isDeleted = false
            ORDER BY c.displayName
            """)
    List<Customer> findAllActiveCustomers();

    List<Customer> findByIsDeletedFalseOrderByDisplayNameAsc();

    long countByIsDeletedFalse();

    long countByCustomerTypeAndIsDeletedFalse(String customerType);
}
