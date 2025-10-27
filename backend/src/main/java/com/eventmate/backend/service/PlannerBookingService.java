package com.eventmate.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.backend.models.Planner;
import com.eventmate.backend.models.PlannerBooking;
import com.eventmate.backend.models.User;
import com.eventmate.backend.payload.request.PlannerBookingRequest;
import com.eventmate.backend.repositories.PlannerBookingRepository;
import com.eventmate.backend.repositories.PlannerRepository;
import com.eventmate.backend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PlannerBookingService {

    @Autowired private PlannerBookingRepository bookingRepository;
    @Autowired private PlannerRepository plannerRepository;
    @Autowired private UserRepository userRepository; // Assume UserRepository exists

    public PlannerBooking createBooking(PlannerBookingRequest request, String userEmail) {
        
        LocalDate bookingDate = request.bookingDate();
        Long plannerId = request.plannerId();

        // 1. Double booking check (409 Conflict logic)
        boolean isBooked = bookingRepository.existsByPlanner_PlannerIdAndBookingDate(plannerId, bookingDate);
        if (isBooked) {
            throw new IllegalStateException("This planner is already booked on this date.");
        }

        // 2. Fetch Entities
        Planner planner = plannerRepository.findById(plannerId)
                .orElseThrow(() -> new EntityNotFoundException("Planner not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        // 3. Create Booking
        PlannerBooking newBooking = new PlannerBooking();
        newBooking.setPlanner(planner);
        newBooking.setUser(user);
        newBooking.setBookingDate(bookingDate);
        newBooking.setUserName(request.userName());
        newBooking.setUserPhone(request.userPhone());
        newBooking.setEventType(request.eventType());
        
        return bookingRepository.save(newBooking);
    }

    public List<Planner> getAvailablePlanners(LocalDate date) {
        List<Long> bookedIds = bookingRepository.findBookedPlannerIdsOnDate(date);

        if (bookedIds.isEmpty()) {
            return plannerRepository.findAll();
        } else {
            return plannerRepository.findByPlannerIdNotIn(bookedIds);
        }
    }
}
