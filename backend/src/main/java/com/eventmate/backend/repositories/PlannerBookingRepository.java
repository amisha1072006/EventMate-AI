package com.eventmate.backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eventmate.backend.models.PlannerBooking;

public interface PlannerBookingRepository extends JpaRepository<PlannerBooking, Long> {

    // Double booking check
    boolean existsByPlanner_PlannerIdAndBookingDate(Long plannerId, LocalDate bookingDate);

    // Booked Planners ki IDs nikalne ke liye
    @Query("SELECT pb.planner.plannerId FROM PlannerBooking pb WHERE pb.bookingDate = :date")
    List<Long> findBookedPlannerIdsOnDate(@Param("date") LocalDate date);
}
