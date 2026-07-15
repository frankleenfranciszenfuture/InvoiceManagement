package com.inm.controller.taxMaster;

import com.inm.dto.commonResponses.ApiResponse;
import com.inm.dto.taxMaster.TaxMasterRequestDTO;
import com.inm.dto.taxMaster.TaxMasterResponseDTO;
import com.inm.enums.TaxType;
import com.inm.service.TaxMasterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tax-master")
@RequiredArgsConstructor
public class TaxMasterController {

    private final TaxMasterService taxMasterService;

    @PostMapping
    public ResponseEntity<ApiResponse<TaxMasterResponseDTO>> create(
            @Valid @RequestBody TaxMasterRequestDTO dto) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Tax created successfully",
                        taxMasterService.create(dto)
                )
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TaxMasterResponseDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody TaxMasterRequestDTO dto) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Tax updated successfully",
                        taxMasterService.update(id, dto)
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TaxMasterResponseDTO>> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Tax retrieved successfully",
                        taxMasterService.getById(id)
                )
        );
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<TaxMasterResponseDTO>>> getAll() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Taxes retrieved successfully",
                        taxMasterService.getAll()
                )
        );
    }


    @GetMapping("/type/{taxType}")
    public ResponseEntity<ApiResponse<List<TaxMasterResponseDTO>>> getByType(
            @PathVariable TaxType taxType) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Taxes retrieved successfully",
                        taxMasterService.getByType(taxType)
                )
        );
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        taxMasterService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.success("Tax deleted successfully", null)
        );
    }


}