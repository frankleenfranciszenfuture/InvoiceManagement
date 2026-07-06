package com.inm.controller.itemMaster;

import com.inm.dto.itemsMaster.ItemMasterRequest;
import com.inm.dto.itemsMaster.ItemMasterResponse;
import com.inm.enums.ItemStatus;
import com.inm.service.ItemMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

@RestController
@RequestMapping("/item-master")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ItemMasterController {

    private final ItemMasterService itemMasterService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ItemMasterResponse> create(
            @RequestPart("item") String item,
            @RequestPart(value = "image", required = false) MultipartFile image)
            throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        ItemMasterRequest request =
                mapper.readValue(item, ItemMasterRequest.class);

        return ResponseEntity.ok(itemMasterService.create(request, image));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ItemMasterResponse> update(
            @PathVariable Long id,
            @RequestPart("item") ItemMasterRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        return ResponseEntity.ok(itemMasterService.update(id, request, image));
    }


    @GetMapping("/{id}")
    public ResponseEntity<ItemMasterResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(itemMasterService.getById(id));
    }


    @GetMapping
    public ResponseEntity<List<ItemMasterResponse>> getAll(
            @RequestParam(defaultValue = "ALL") ItemStatus itemStatus) {

        return ResponseEntity.ok(itemMasterService.getAll(itemStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        itemMasterService.delete(id);

        return ResponseEntity.noContent().build();
    }
}