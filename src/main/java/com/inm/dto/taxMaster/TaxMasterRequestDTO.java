package com.inm.dto.taxMaster;

import com.inm.enums.TaxType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TaxMasterRequestDTO {

    @NotBlank(message = "Tax name is required")
    private String taxName;

    @NotNull(message = "Tax type is required")
    private TaxType taxType;

    @NotNull(message = "Tax rate is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Tax rate must be greater than or equal to 0")
    private BigDecimal taxRate;

    private String description;

    private Boolean active = true;
}