package com.inm.mapper;


import com.inm.dto.salesPerson.SalesPersonRequest;
import com.inm.dto.salesPerson.SalesPersonResponse;
import com.inm.entity.SalesPerson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SalesPersonMapper {

    SalesPerson toEntity(SalesPersonRequest request);

    SalesPersonResponse toResponse(SalesPerson salesPerson);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "invoices", ignore = true)
    void updateEntityFromRequest(SalesPersonRequest request,
                                 @MappingTarget SalesPerson salesPerson);
}