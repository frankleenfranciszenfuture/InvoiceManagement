package com.inm.repository;

import com.inm.entity.Customer;
import com.inm.entity.Invoice;
import com.inm.enums.CustomerStatus;
import com.inm.enums.InvoiceStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {



    @Query("""
SELECT i
FROM Invoice i
WHERE
    (:search IS NULL OR :search = '' OR
     LOWER(i.invoiceNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR
     LOWER(i.subject) LIKE LOWER(CONCAT('%', :search, '%')))
""")
    Page<Invoice> searchInvoices(
            @Param("search") String search,
            Pageable pageable);




    @Query("""
SELECT i
FROM Invoice i
WHERE i.customer.id = :customerId
AND (
    :search IS NULL OR :search = '' OR
    LOWER(i.invoiceNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR
    LOWER(i.subject) LIKE LOWER(CONCAT('%', :search, '%'))
)
""")
    Page<Invoice> searchCustomerInvoices(
            @Param("customerId") Long customerId,
            @Param("search") String search,
            Pageable pageable);


    @Query("""
SELECT i
FROM Invoice i
WHERE i.invoiceStatus = :invoiceStatus
AND (
    :search IS NULL
    OR :search = ''
    OR LOWER(i.invoiceNumber) LIKE LOWER(CONCAT('%', :search, '%'))
    OR LOWER(i.subject) LIKE LOWER(CONCAT('%', :search, '%'))
)
""")
    Page<Invoice> searchInvoiceByStatus(
            @Param("invoiceStatus") InvoiceStatus invoiceStatus,
            @Param("search") String search,
            Pageable pageable
    );



    Optional<Invoice> findTopByInvoiceNumberStartingWithOrderByInvoiceNumberDesc(String prefix);


}

