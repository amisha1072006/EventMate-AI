package com.eventmate.backend.repositories;

import com.eventmate.backend.models.HallBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HallBookingRepository extends JpaRepository<HallBooking, Long> {

    // Finds bookings for a hall on a specific day (for general double-booking check)
    List<HallBooking> findByHall_HallIdAndBookingTimeBetween(Long hallId, LocalDateTime startOfDay, LocalDateTime endOfDay);
    
    // Finds all bookings for a hall (for the frontend calendar)
    List<HallBooking> findByHall_HallId(Long hallId);
    
    // Checks if a specific user has already booked a specific hall on a specific day
    boolean existsByHall_HallIdAndUser_IdAndBookingTimeBetween(Long hallId, Long userId, LocalDateTime startOfDay, LocalDateTime endOfDay);
}