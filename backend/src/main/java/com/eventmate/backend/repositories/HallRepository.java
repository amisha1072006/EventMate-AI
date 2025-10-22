// File Location: src/main/java/com/eventmate/backend/repositories/HallRepository.java

package com.eventmate.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.backend.models.Hall; // List को import करें

@Repository
public interface HallRepository extends JpaRepository<Hall, Long> {

    // --- START: NEW METHOD FOR SUGGESTIONS ---
    /**
     * Finds all Halls whose hallId is NOT present in the provided list of IDs.
     * Useful for finding available halls.
     */
    List<Hall> findByHallIdNotIn(List<Long> hallIds);
    // --- END: NEW METHOD FOR SUGGESTIONS ---
}