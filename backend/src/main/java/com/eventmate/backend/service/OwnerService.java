package com.eventmate.backend.service;

import com.eventmate.backend.models.Owner;
import com.eventmate.backend.repositories.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String loginOwner(String email, String password) {
        Owner owner = ownerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        if (passwordEncoder.matches(password, owner.getPassword())) {
            return "Login successful";
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public Owner signupOwner(Owner owner) {
        owner.setPassword(passwordEncoder.encode(owner.getPassword()));
        return ownerRepository.save(owner);
    }

    public String forgotPassword(String email) {
        Owner owner = ownerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        return "OTP sent to email: " + email;
    }
}
