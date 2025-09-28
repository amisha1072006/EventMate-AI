package com.example.eventmate_backend.models;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table; // Ise import karein

@Entity
@Table(name = "users")
public class User implements UserDetails { // <-- Yahan UserDetails ko implement karein

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // --- UserDetails Methods ---
    // Niche diye gaye methods ko add karein

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Hum roles ka istemal nahi kar rahe, isliye empty list return karein
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        // Hum username ki jagah email use kar rahe hain
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    // Sirf password ke liye setter rakhein, getter UserDetails se aa jayega
    public void setPassword(String password) {
        this.password = password;
    }
}