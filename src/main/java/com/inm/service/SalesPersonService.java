package com.inm.service;

import com.inm.dto.salesPerson.SalesPersonRequest;
import com.inm.dto.salesPerson.SalesPersonResponse;

import java.util.List;

public interface SalesPersonService {

    SalesPersonResponse create(SalesPersonRequest request);

    SalesPersonResponse update(Long id, SalesPersonRequest request);

    SalesPersonResponse getById(Long id);

    List<SalesPersonResponse> getAll();

    void delete(Long id);

}