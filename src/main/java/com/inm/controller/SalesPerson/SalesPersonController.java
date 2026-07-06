package com.inm.controller.SalesPerson;

import com.inm.dto.salesPerson.SalesPersonRequest;
import com.inm.dto.salesPerson.SalesPersonResponse;
import com.inm.service.SalesPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales-persons")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesPersonController {

    private final SalesPersonService service;

    @PostMapping
    public SalesPersonResponse create(@RequestBody SalesPersonRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public SalesPersonResponse update(
            @PathVariable Long id,
            @RequestBody SalesPersonRequest request) {

        return service.update(id, request);
    }

    @GetMapping("/{id}")
    public SalesPersonResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping
    public List<SalesPersonResponse> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
