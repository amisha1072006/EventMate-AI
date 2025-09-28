package com.example.eventmate_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.eventmate_backend.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Check karega ki email pehle se maujood hai ya nahi
    boolean existsByEmail(String email);
    
    // Login ke liye user ko email se find karega
    User findByEmail(String email);
}