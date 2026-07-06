package com.inm.service.impl;

import com.inm.dto.itemsMaster.ItemMasterRequest;
import com.inm.dto.itemsMaster.ItemMasterResponse;
import com.inm.entity.ItemMaster;
import com.inm.enums.ItemStatus;
import com.inm.mapper.ItemMasterMapper;
import com.inm.repository.ItemMasterRepository;
import com.inm.service.ItemMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemMasterServiceImpl implements ItemMasterService {

    private final ItemMasterRepository repository;
    private final ItemMasterMapper mapper;

    @Override
    public ItemMasterResponse create(ItemMasterRequest request,
                                     MultipartFile image) {

        ItemMaster item = mapper.toEntity(request);

        if (item.getItemStatus() == null) {
            item.setItemStatus(ItemStatus.ACTIVE);
        }

        if (image != null && !image.isEmpty()) {

            String fileName = UUID.randomUUID()
                    + "_" + image.getOriginalFilename();

            Path uploadDir = Paths.get("uploads");

            try {
                Files.createDirectories(uploadDir);

                Files.copy(
                        image.getInputStream(),
                        uploadDir.resolve(fileName),
                        StandardCopyOption.REPLACE_EXISTING
                );

                item.setImagePath(fileName);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        repository.save(item);

        return mapper.toResponse(repository.save(item));
    }

    @Override
    public ItemMasterResponse update(Long id,
                                     ItemMasterRequest request,
                                     MultipartFile image) {

        ItemMaster item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        mapper.updateEntity(request, item);

        if (request.getItemStatus() != null) {
            item.setItemStatus(request.getItemStatus());
        }

        if (image != null && !image.isEmpty()) {

            String fileName = UUID.randomUUID()
                    + "_" + image.getOriginalFilename();

            Path uploadDir = Paths.get("uploads");

            try {
                Files.createDirectories(uploadDir);

                Files.copy(
                        image.getInputStream(),
                        uploadDir.resolve(fileName),
                        StandardCopyOption.REPLACE_EXISTING
                );

                item.setImagePath(fileName);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        repository.save(item);

        return mapper.toResponse(repository.save(item));

    }

    @Override
    public ItemMasterResponse getById(Long id) {

        ItemMaster item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        return mapper.toResponse(item);
    }


    @Override
    public List<ItemMasterResponse> getAll(ItemStatus itemStatus) {

        List<ItemMaster> items;

        if (itemStatus == ItemStatus.ALL) {
            items = repository.findAll();
        } else {
            items = repository.findByItemStatus(itemStatus);
        }

        return mapper.toResponses(items);
    }

    @Override
    public void delete(Long id) {

        ItemMaster item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        repository.delete(item);
    }
}