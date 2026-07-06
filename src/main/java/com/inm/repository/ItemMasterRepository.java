package com.inm.repository;

import com.inm.entity.ItemMaster;
import com.inm.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemMasterRepository extends JpaRepository<ItemMaster,Long> {
    List<ItemMaster> findByItemStatus(ItemStatus itemStatus);
}
