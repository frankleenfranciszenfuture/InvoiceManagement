package com.inm.mapper;


import com.inm.dto.taxMaster.TaxMasterRequestDTO;
import com.inm.dto.taxMaster.TaxMasterResponseDTO;
import com.inm.entity.TaxMaster;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface TaxMasterMapper {

    TaxMaster toEntity(TaxMasterRequestDTO dto);

    TaxMasterResponseDTO toResponseDTO(TaxMaster entity);

    List<TaxMasterResponseDTO> toResponseDTOList(List<TaxMaster> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDTO(
            TaxMasterRequestDTO dto,
            @MappingTarget TaxMaster entity
    );
}