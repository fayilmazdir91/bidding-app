package com.fayilmazdir91.biddingapp.service;

import com.fayilmazdir91.biddingapp.entity.Bid;
import com.fayilmazdir91.biddingapp.entity.Product;
import com.fayilmazdir91.biddingapp.entity.User;
import com.fayilmazdir91.biddingapp.repository.BidRepository;
import com.fayilmazdir91.biddingapp.repository.ProductRepository;
import com.fayilmazdir91.biddingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BidService {

    private final BidRepository bidRepository;

    private final ProductRepository productRepository;

    private  final UserRepository userRepository;


    public Bid getLastBidByProductId(Long productId) {
        List<Bid> bids = bidRepository.findByProductId(productId);

        if (!bids.isEmpty()) {
            return bids.get(0);
        }
        return null;
    }

    public boolean isBidAmountValid(Bid bid) {
        Product product = bid.getProduct();
        if (product == null) {
            throw new IllegalArgumentException("Bid must have a product.");
        }
        Bid lastBid = getLastBidByProductId(product.getId());
        if (lastBid != null) {
            return bid.getAmount().compareTo(lastBid.getAmount()) > 0;
        } else {
            return bid.getAmount().compareTo(productRepository.findById(product.getId()).get().getStartingBid()) >= 0;
        }
    }


    public List<Bid> getBidsByProductId(Long productId) {
        return bidRepository.findByProductId(productId);
    }


    public Bid saveBid(Bid bid) {
        if (isBidAmountValid(bid)) {
            bid.setTimestamp(LocalDateTime.now());
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(userName);
            bid.setUser(user);
            productRepository.changeLastBid(bid.getProduct().getId(), bid.getAmount());
            return bidRepository.save(bid);
        }
        throw new IllegalArgumentException("Bid amount must be greater than the last bid amount.");
    }

}
