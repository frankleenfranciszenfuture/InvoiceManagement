package com.inm.mapper;

import com.inm.dto.address.AddressDTO;
import com.inm.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    Address toEntity(AddressDTO dto);

    AddressDTO toDTO(Address entity);
}