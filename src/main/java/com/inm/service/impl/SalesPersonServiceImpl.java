package com.inm.service.impl;

import com.inm.dto.salesPerson.SalesPersonRequest;
import com.inm.dto.salesPerson.SalesPersonResponse;
import com.inm.entity.SalesPerson;
import com.inm.mapper.SalesPersonMapper;
import com.inm.repository.SalesPersonRepository;
import com.inm.service.SalesPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesPersonServiceImpl implements SalesPersonService {

    private final SalesPersonRepository repository;
    private final SalesPersonMapper mapper;

    @Override
    public SalesPersonResponse create(SalesPersonRequest request) {

        SalesPerson salesPerson = mapper.toEntity(request);

        return mapper.toResponse(repository.save(salesPerson));
    }

    @Override
    public SalesPersonResponse update(Long id, SalesPersonRequest request) {

        SalesPerson salesPerson = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sales Person not found"));

        mapper.updateEntityFromRequest(request, salesPerson);

        return mapper.toResponse(repository.save(salesPerson));
    }

    @Override
    public SalesPersonResponse getById(Long id) {

        SalesPerson salesPerson = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sales Person not found"));

        return mapper.toResponse(salesPerson);
    }

    @Override
    public List<SalesPersonResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public void delete(Long id) {

        repository.deleteById(id);
    }
}
