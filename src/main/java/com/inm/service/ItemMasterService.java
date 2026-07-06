package com.inm.service;

import com.inm.dto.itemsMaster.ItemMasterRequest;
import com.inm.dto.itemsMaster.ItemMasterResponse;
import com.inm.enums.ItemStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemMasterService {

    ItemMasterResponse create(ItemMasterRequest request, MultipartFile image);

    ItemMasterResponse update(Long id, ItemMasterRequest request, MultipartFile image);

    ItemMasterResponse getById(Long id);

    List<ItemMasterResponse> getAll(ItemStatus itemStatus);

    void delete(Long id);
}