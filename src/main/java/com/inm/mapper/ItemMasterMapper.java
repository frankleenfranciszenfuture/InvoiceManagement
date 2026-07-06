package com.inm.mapper;

import com.inm.dto.itemsMaster.ItemMasterRequest;
import com.inm.dto.itemsMaster.ItemMasterResponse;
import com.inm.entity.ItemMaster;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemMasterMapper {

    ItemMaster toEntity(ItemMasterRequest request);

    ItemMasterResponse toResponse(ItemMaster entity);

    void updateEntity(
            ItemMasterRequest request,
            @MappingTarget ItemMaster itemMaster
    );

    List<ItemMasterResponse> toResponses(List<ItemMaster> entities);
}
