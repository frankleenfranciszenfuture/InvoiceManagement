package com.inm.dto.salesPerson;

import lombok.Data;

@Data
public class SalesPersonResponse {

    private Long id;
    private String salesPersonName;
    private String email;
    private String phone;

}
