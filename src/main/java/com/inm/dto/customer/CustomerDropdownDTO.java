package com.inm.dto.customer;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDropdownDTO {

    private Long id;

    private String displayName;

}