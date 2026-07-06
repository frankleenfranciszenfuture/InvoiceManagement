package com.inm.mapper;

import com.inm.dto.invoice.request.InvoiceItemRequest;
import com.inm.dto.invoice.response.InvoiceItemResponse;
import com.inm.entity.InvoiceItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InvoiceItemMapper {

    @Mapping(source = "item.id", target = "itemId")
    @Mapping(source = "item.itemName", target = "itemName")
    @Mapping(source = "invoice.id", target = "invoiceId")
    InvoiceItemResponse toResponse(InvoiceItem item);

    List<InvoiceItemResponse> toItemResponses(List<InvoiceItem> items);
}