package com.inm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inm.enums.ItemStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "itemsMaster")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private String itemType;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus itemStatus;

    @Column(nullable = false)
    private Double sellingPrice;

    @Column(nullable = false)
    private Double purchasePrice;

    private String unit;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imagePath;

    @JsonIgnore
    @OneToMany(mappedBy = "item")
    private List<InvoiceItem> invoiceItems = new ArrayList<>();
}