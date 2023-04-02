package com.fayilmazdir91.biddingapp.repository;

import com.fayilmazdir91.biddingapp.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.lastBid = :lastBid WHERE p.id = :id")
    public void changeLastBid(@Param("id") Long id, @Param("lastBid") BigDecimal lastBid);

}
