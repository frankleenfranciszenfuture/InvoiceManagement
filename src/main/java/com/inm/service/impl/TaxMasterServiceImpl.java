package com.inm.service.impl;


import com.inm.dto.taxMaster.TaxMasterRequestDTO;
import com.inm.dto.taxMaster.TaxMasterResponseDTO;
import com.inm.entity.TaxMaster;
import com.inm.enums.TaxType;
import com.inm.exception.ResourceNotFoundException;
import com.inm.mapper.TaxMasterMapper;
import com.inm.repository.TaxMasterRepository;
import com.inm.service.TaxMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaxMasterServiceImpl implements TaxMasterService {

    private final TaxMasterRepository taxMasterRepository;
    private final TaxMasterMapper taxMasterMapper;

    @Override
    public TaxMasterResponseDTO create(TaxMasterRequestDTO dto) {

        TaxMaster taxMaster = taxMasterMapper.toEntity(dto);

        TaxMaster saved = taxMasterRepository.save(taxMaster);

        return taxMasterMapper.toResponseDTO(saved);
    }

    @Override
    public TaxMasterResponseDTO update(Long id, TaxMasterRequestDTO dto) {

        TaxMaster taxMaster = taxMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tax not found with id: " + id));

        taxMasterMapper.updateEntityFromDTO(dto, taxMaster);

        TaxMaster updated = taxMasterRepository.save(taxMaster);

        return taxMasterMapper.toResponseDTO(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public TaxMasterResponseDTO getById(Long id) {

        TaxMaster taxMaster = taxMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tax not found with id: " + id));

        return taxMasterMapper.toResponseDTO(taxMaster);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaxMasterResponseDTO> getAll() {

        return taxMasterMapper.toResponseDTOList(taxMasterRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaxMasterResponseDTO> getByType(TaxType taxType) {

        return taxMasterMapper.toResponseDTOList(
                taxMasterRepository.findByTaxTypeAndActiveTrue(taxType)
        );
    }

    @Override
    public void delete(Long id) {

        TaxMaster taxMaster = taxMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tax not found with id: " + id));

        taxMasterRepository.delete(taxMaster);
    }
}