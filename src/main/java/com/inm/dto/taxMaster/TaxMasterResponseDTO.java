package com.inm.dto.taxMaster;

import com.inm.enums.TaxType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TaxMasterResponseDTO {

    private Long id;

    private String taxName;

    private TaxType taxType;

    private BigDecimal taxRate;

    private String description;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
