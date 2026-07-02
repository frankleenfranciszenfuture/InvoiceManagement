package com.inm.dto.customer;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDashboardDTO {

    private Long totalCustomers;

    private Long businessCustomers;

    private Long individualCustomers;

    private Long activeCustomers;

}
