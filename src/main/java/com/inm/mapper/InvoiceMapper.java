package com.inm.mapper;

import com.inm.dto.invoice.request.InvoiceItemRequest;
import com.inm.dto.invoice.request.InvoiceRequest;
import com.inm.dto.invoice.response.InvoiceResponse;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.entity.Invoice;
import com.inm.entity.InvoiceItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = InvoiceItemMapper.class)
public interface InvoiceMapper {

    Invoice toEntity(InvoiceRequest dto);

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.displayName", target = "customerName")
    @Mapping(source = "customer.email", target = "customerEmail")

    @Mapping(source = "salesPerson.id", target = "salesPersonId")
    @Mapping(source = "salesPerson.salesPersonName", target = "salesPersonName")
    @Mapping(target = "invoiceStatus", source = "invoiceStatus")
    InvoiceResponse toResponse(Invoice invoice);
}