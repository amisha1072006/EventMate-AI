package com.eventmate.backend.repositories;

import com.eventmate.backend.models.HallBooking; // Updated import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallBookingRepository extends JpaRepository<HallBooking, Long> { // Updated class name
}