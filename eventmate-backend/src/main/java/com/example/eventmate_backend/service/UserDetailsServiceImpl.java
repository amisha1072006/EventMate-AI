package com.example.eventmate_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.eventmate_backend.models.User;
import com.example.eventmate_backend.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        // --- DEBUGGING PRINT STATEMENTS ---
        System.out.println("======================================================");
        System.out.println("--- UserDetailsServiceImpl: Attempting to load user ---");
        System.out.println("Searching for email: " + email);
        // ------------------------------------

        User user = userRepository.findByEmail(email);
        
        if (user == null) {
            System.out.println("!!! ERROR: User not found in the database !!!");
            System.out.println("======================================================");
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        
        // --- DEBUGGING PRINT STATEMENTS ---
        System.out.println("User found in DB: " + user.getUsername());
        System.out.println("Hashed password from DB for comparison: " + user.getPassword());
        System.out.println("======================================================");
        // ------------------------------------
        
        return user;
    }
}