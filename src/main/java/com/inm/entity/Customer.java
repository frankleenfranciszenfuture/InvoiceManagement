package com.inm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerType;

    private String salutation;

    private String firstName;

    private String lastName;

    private String companyName;

    @Column(nullable = false)
    private String displayName;

    private String currency;

    @Column(unique = true)
    private String email;

    private String workPhoneCode;

    private String workPhone;

    private String mobileCode;

    private String mobile;

    @Column(name = "customer_language")
    private String customerLanguage;

    private String pan;

    private String paymentTerms;

    private Boolean enablePortal;

    private String websiteUrl;

    private String department;

    private String designation;

    private String twitter;

    private String skype;

    private String facebook;

    // Billing Address
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "billing_address_id")
    private Address billingAddress;

    // Shipping Address
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "shipping_address_id")
    private Address shippingAddress;

    @Column(nullable = false)
    private Boolean isDeleted = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

