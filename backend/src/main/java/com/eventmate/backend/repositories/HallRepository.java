// File Location: src/main/java/com/eventmate/backend/repositories/HallRepository.java

package com.eventmate.backend.repositories;

import com.eventmate.backend.models.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallRepository extends JpaRepository<Hall, Long> {
}