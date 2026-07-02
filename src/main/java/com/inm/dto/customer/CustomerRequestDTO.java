package com.inm.dto.customer;

import com.inm.dto.address.AddressDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequestDTO {

    @NotBlank
    private String customerType;

    private String salutation;

    @Size(max = 100)
    private String firstName;

    @Size(max = 100)
    private String lastName;

    @Size(max = 150)
    private String companyName;

    @NotBlank(message = "Display Name is required")
    @Size(max = 150)
    private String displayName;

    @NotBlank
    private String currency;

    @Email(message = "Invalid email")
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

    @Valid
    private AddressDTO billingAddress;

    @Valid
    private AddressDTO shippingAddress;
}