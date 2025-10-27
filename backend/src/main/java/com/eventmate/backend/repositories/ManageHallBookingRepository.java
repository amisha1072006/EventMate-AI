package com.eventmate.backend.repositories;

import com.eventmate.backend.models.ManageHallBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ManageHallBookingRepository extends JpaRepository<ManageHallBooking, Long> {
    List<ManageHallBooking> findByHallId(Long hallId);
    List<ManageHallBooking> findByOwnerPhone(String ownerPhone);
    List<ManageHallBooking> findByHallIdAndBookingDate(Long hallId, LocalDate bookingDate);
    boolean existsByHallIdAndBookingDate(Long hallId, LocalDate bookingDate);
}
