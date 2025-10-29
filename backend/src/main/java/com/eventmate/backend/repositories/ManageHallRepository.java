package com.eventmate.backend.repositories;

import com.eventmate.backend.models.ManageHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageHallRepository extends JpaRepository<ManageHall, Long> {
    // You can add custom queries if needed in future
}
