package com.inm.mapper;

import com.inm.dto.invoice.request.InvoiceItemRequest;
import com.inm.dto.invoice.request.InvoiceRequest;
import com.inm.dto.invoice.response.InvoiceResponse;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.entity.Invoice;
import com.inm.entity.InvoiceItem;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                InvoiceItemMapper.class,
                CustomerMapper.class,
                SalesPersonMapper.class
        }
)
public interface InvoiceMapper {

    // Entity -> Response
    InvoiceResponse toResponse(Invoice invoice);

    // Request -> Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "salesPerson", ignore = true)
    @Mapping(target = "items", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    @Mapping(target = "emailSent", ignore = true)
    @Mapping(target = "emailSentDate", ignore = true)
    @Mapping(target = "paidDate", ignore = true)
    @Mapping(target = "paidAmount", ignore = true)
    @Mapping(target = "pdfGenerated", ignore = true)
    Invoice toEntity(InvoiceRequest request);

    // Update existing entity
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "salesPerson", ignore = true)
    @Mapping(target = "items", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    @Mapping(target = "emailSent", ignore = true)
    @Mapping(target = "emailSentDate", ignore = true)
    @Mapping(target = "paidDate", ignore = true)
    @Mapping(target = "paidAmount", ignore = true)
    @Mapping(target = "pdfGenerated", ignore = true)
    void updateEntity(InvoiceRequest request,
                      @MappingTarget Invoice invoice);
}