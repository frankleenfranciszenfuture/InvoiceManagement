package com.inm.service;


import com.inm.dto.taxMaster.TaxMasterRequestDTO;
import com.inm.dto.taxMaster.TaxMasterResponseDTO;
import com.inm.enums.TaxType;

import java.util.List;

public interface TaxMasterService {

        TaxMasterResponseDTO create(TaxMasterRequestDTO dto);

        TaxMasterResponseDTO update(Long id, TaxMasterRequestDTO dto);

        TaxMasterResponseDTO getById(Long id);

        List<TaxMasterResponseDTO> getAll();

        List<TaxMasterResponseDTO> getByType(TaxType taxType);

        void delete(Long id);
    }

