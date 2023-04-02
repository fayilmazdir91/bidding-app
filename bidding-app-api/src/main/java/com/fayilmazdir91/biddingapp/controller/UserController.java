package com.fayilmazdir91.biddingapp.controller;

import com.fayilmazdir91.biddingapp.entity.Bid;
import com.fayilmazdir91.biddingapp.entity.User;
import com.fayilmazdir91.biddingapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUser(@RequestBody User user) {
        return userService.createUser(user);

    }
}
