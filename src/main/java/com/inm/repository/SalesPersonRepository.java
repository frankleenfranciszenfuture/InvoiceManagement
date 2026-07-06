package com.inm.repository;

import com.inm.entity.SalesPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesPersonRepository extends JpaRepository<SalesPerson,Long> {

    boolean existsByEmail(String email);
}
