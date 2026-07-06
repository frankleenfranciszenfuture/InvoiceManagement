package com.inm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sales_persons")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SalesPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String salesPersonName;

    private String email;

    private String phone;

    @OneToMany(mappedBy = "salesPerson")
    private List<Invoice> invoices = new ArrayList<>();
}