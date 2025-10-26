// package com.eventmate.backend.repositories;

// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param; // LocalDate import करें
// import org.springframework.stereotype.Repository;

// import com.eventmate.backend.models.HallBooking;

// @Repository
// public interface HallBookingRepository extends JpaRepository<HallBooking, Long> {

//     // Finds bookings for a hall on a specific day (for general double-booking check)
//     List<HallBooking> findByHall_HallIdAndBookingTimeBetween(Long hallId, LocalDateTime startOfDay, LocalDateTime endOfDay);
    
//     // Finds all bookings for a hall (for the frontend calendar)
//     List<HallBooking> findByHall_HallId(Long hallId);
    
//     // Checks if a specific user has already booked a specific hall on a specific day
//     boolean existsByHall_HallIdAndUser_IdAndBookingTimeBetween(Long hallId, Long userId, LocalDateTime startOfDay, LocalDateTime endOfDay);

//     // --- START: NEW METHODS FOR SUGGESTIONS ---

//     /**
//      * Checks if any booking exists for a specific hall on a given date.
//      * It extracts the date part from the bookingTime for comparison.
//      */
//     @Query("SELECT CASE WHEN COUNT(hb) > 0 THEN TRUE ELSE FALSE END " +
//            "FROM HallBooking hb WHERE hb.hall.hallId = :hallId AND FUNCTION('DATE', hb.bookingTime) = :bookingDate")
//     boolean existsBookingOnDate(@Param("hallId") Long hallId, @Param("bookingDate") LocalDate bookingDate);

//     /**
//      * Finds the distinct IDs of all halls that are booked on a specific date.
//      * It extracts the date part from the bookingTime for comparison.
//      */
//     @Query("SELECT DISTINCT hb.hall.hallId FROM HallBooking hb WHERE FUNCTION('DATE', hb.bookingTime) = :bookingDate")
//     List<Long> findBookedHallIdsOnDate(@Param("bookingDate") LocalDate bookingDate);

//     // --- END: NEW METHODS FOR SUGGESTIONS ---
// }
package com.eventmate.backend.repositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eventmate.backend.models.HallBooking;

public interface HallBookingRepository extends JpaRepository<HallBooking, Long> {

    // --- YEH NAYI QUERY ADD KI GAYI HAI ---
    // Yeh query di gayi date par book ho chuke sabhi hall ki IDs return karti hai
    @Query("SELECT DISTINCT hb.hall.hallId FROM HallBooking hb WHERE FUNCTION('DATE', hb.bookingTime) = :date")
    List<Long> findBookedHallIdsOnDate(@Param("date") LocalDate date);

    // --- YEH AAPKA PURANA CODE HAI (jaisa HallBookingController mein use hua hai) ---
    @Query("SELECT CASE WHEN COUNT(hb) > 0 THEN TRUE ELSE FALSE END FROM HallBooking hb " +
           "WHERE hb.hall.hallId = :hallId AND FUNCTION('DATE', hb.bookingTime) = :date")
    boolean existsBookingOnDate(@Param("hallId") Long hallId, @Param("date") LocalDate date);
    
    List<HallBooking> findByHall_HallIdAndBookingTimeBetween(Long hallId, LocalDateTime start, LocalDateTime end);

    boolean existsByHall_HallIdAndUser_IdAndBookingTimeBetween(Long hallId, Long userId, LocalDateTime start, LocalDateTime end);
    
    List<HallBooking> findByHall_HallId(Long hallId);
}