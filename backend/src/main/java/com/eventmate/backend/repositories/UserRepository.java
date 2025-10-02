package com.eventmate.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eventmate.backend.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Check if an email already exists
    boolean existsByEmail(String email);

    // Find a user by email
    User findByEmail(String email);
}
