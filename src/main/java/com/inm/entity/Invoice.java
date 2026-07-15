package com.inm.entity;

import com.inm.enums.InvoiceStatus;
import com.inm.enums.TaxType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invoices")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Invoice Number
    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    // Dates
    @Column(nullable = false)
    private LocalDate invoiceDate;

    private LocalDate dueDate;

    // Customer Details
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Sales Person
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sales_person_id")
    private SalesPerson salesPerson;

    // Invoice Information
    private String subject;

    @Column(length = 500)
    private String customerNotes;

    @Column(length = 500)
    private String terms;

    private String orderNumber;

    private String referenceNumber;

    // Currency
    private String currency;

    private BigDecimal exchangeRate;

    // Invoice Items
    @OneToMany(
            mappedBy = "invoice",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<InvoiceItem> items = new ArrayList<>();


    //Tax

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tax_master_id")
    private TaxMaster taxMaster;

    private String taxNameSnapshot;
    private BigDecimal taxRateSnapshot;
    private TaxType taxTypeSnapshot;

    // Amounts
    @Column(precision = 18, scale = 2)
    private BigDecimal subTotal;

    @Column(precision = 18, scale = 2)
    private BigDecimal discountAmount;

    @Column(precision = 18, scale = 2)
    private BigDecimal taxAmount;

    @Column(precision = 18, scale = 2)
    private BigDecimal shippingCharges;

    @Column(precision = 18, scale = 2)
    private BigDecimal adjustment;

    @Column(precision = 18, scale = 2)
    private BigDecimal totalAmount;

    // Status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvoiceStatus invoiceStatus;

    // Send Information
    private Boolean emailSent;

    private LocalDate emailSentDate;

    // Payment Information
    private LocalDate paidDate;

    private BigDecimal paidAmount;

    // PDF
    private Boolean pdfGenerated;

    // Audit
    private LocalDate createdDate;

    private LocalDate updatedDate;

    @PrePersist
    public void prePersist() {
        createdDate = LocalDate.now();
        updatedDate = LocalDate.now();

        if (invoiceStatus == null) {
            invoiceStatus = InvoiceStatus.DRAFT;
        }

        if (emailSent == null) {
            emailSent = false;
        }

        if (pdfGenerated == null) {
            pdfGenerated = false;
        }

        if (discountAmount == null) {
            discountAmount = BigDecimal.ZERO;
        }

        if (shippingCharges == null) {
            shippingCharges = BigDecimal.ZERO;
        }

        if (adjustment == null) {
            adjustment = BigDecimal.ZERO;
        }

        if (paidAmount == null) {
            paidAmount = BigDecimal.ZERO;
        }

        if (exchangeRate == null) {
            exchangeRate = BigDecimal.ONE;
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedDate = LocalDate.now();
    };
}