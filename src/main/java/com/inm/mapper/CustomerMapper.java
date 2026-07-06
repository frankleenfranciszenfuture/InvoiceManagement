package com.inm.mapper;

import com.inm.dto.customer.CustomerDTO;
import com.inm.dto.customer.CustomerRequestDTO;
import com.inm.dto.customer.CustomerResponseDTO;
import com.inm.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(
        componentModel = "spring",
        uses = AddressMapper.class
)
public interface CustomerMapper {

    Customer toEntity(CustomerRequestDTO dto);

    @Mapping(target = "status", source = "status")
    CustomerResponseDTO toDTO(Customer entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(CustomerRequestDTO dto,
                      @MappingTarget Customer entity);


}