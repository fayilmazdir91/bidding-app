package com.fayilmazdir91.biddingapp.repository;

import com.fayilmazdir91.biddingapp.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("SELECT b FROM Bid b WHERE b.product.id = :productId ORDER BY b.amount DESC, b.timestamp ASC")
    List<Bid> findByProductId(@Param("productId") Long productId);
}
