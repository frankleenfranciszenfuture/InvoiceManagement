package com.inm.dto.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inm.dto.address.AddressDTO;
import com.inm.enums.CustomerStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponseDTO {

    private Long id;

    private String customerType;

    private String salutation;

    private String firstName;

    private String lastName;

    private String companyName;

    private String displayName;

    private String currency;

    private String email;

    private String workPhoneCode;

    private String workPhone;

    private String mobileCode;

    private String mobile;

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

    private AddressDTO billingAddress;

    private AddressDTO shippingAddress;

    private CustomerStatus status;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime updatedAt;
}
