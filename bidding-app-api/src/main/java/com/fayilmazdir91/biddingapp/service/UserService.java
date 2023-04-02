package com.fayilmazdir91.biddingapp.service;

import com.fayilmazdir91.biddingapp.config.PasswordEncoderConfig;
import com.fayilmazdir91.biddingapp.entity.User;
import com.fayilmazdir91.biddingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoderConfig passwordEncoderConfig;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.emptyList());
    }

    public User createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new DataIntegrityViolationException("Username already exists!");
        } else {
            String encodedPassword = passwordEncoderConfig.passwordEncoder().encode(user.getPassword());
            user.setPassword(encodedPassword);
            return userRepository.save(user);
        }
    }
}
