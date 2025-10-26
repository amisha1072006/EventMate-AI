package com.eventmate.backend.repositories;

import com.eventmate.backend.models.ContactEventmate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactEventmateRepository extends JpaRepository<ContactEventmate, Long> {
    // No custom methods required for now — JPA provides save(), findAll(), deleteById() etc.
}
