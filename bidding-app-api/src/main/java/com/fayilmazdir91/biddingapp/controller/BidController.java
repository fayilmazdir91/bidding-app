package com.fayilmazdir91.biddingapp.controller;

import com.fayilmazdir91.biddingapp.entity.Bid;
import com.fayilmazdir91.biddingapp.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bid")
@RequiredArgsConstructor
public class BidController {

    private final BidService bidService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Bid> getBidsByProductId(@PathVariable String id) {
        return bidService.getBidsByProductId(Long.parseLong(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Bid createBid(@RequestBody Bid bid) {
        return bidService.saveBid(bid);
    }
}
