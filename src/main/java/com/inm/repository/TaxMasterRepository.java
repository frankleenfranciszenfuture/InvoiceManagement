package com.inm.repository;

import com.inm.entity.TaxMaster;
import com.inm.enums.TaxType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxMasterRepository extends JpaRepository<TaxMaster, Long> {

    List<TaxMaster> findByTaxTypeAndActiveTrue(TaxType taxType);


}