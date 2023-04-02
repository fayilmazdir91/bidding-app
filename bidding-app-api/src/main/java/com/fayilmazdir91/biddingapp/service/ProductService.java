package com.fayilmazdir91.biddingapp.service;

import com.fayilmazdir91.biddingapp.entity.Product;
import com.fayilmazdir91.biddingapp.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct(Product product) {
        product.setStartingBid(product.getStartingBid());
        return productRepository.save(product);
    }
}
