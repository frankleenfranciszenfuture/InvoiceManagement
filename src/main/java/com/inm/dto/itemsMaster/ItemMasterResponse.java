package com.inm.dto.itemsMaster;

import com.inm.enums.ItemStatus;
import lombok.Data;

@Data
public class ItemMasterResponse {

    private Long id;

    private String itemName;

    private String itemType;

    private ItemStatus itemStatus;

    private Double sellingPrice;

    private Double purchasePrice;

    private String unit;

    private String description;

    private String imagePath;
}