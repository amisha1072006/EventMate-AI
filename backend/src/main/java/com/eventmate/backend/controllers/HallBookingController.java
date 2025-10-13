package com.eventmate.backend.controllers;

import com.eventmate.backend.models.HallBooking;
import com.eventmate.backend.payload.request.HallBookingRequest;
import com.eventmate.backend.service.HallBookingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class HallBookingController {

    private final HallBookingService hallBookingService;

    public HallBookingController(HallBookingService hallBookingService) {
        this.hallBookingService = hallBookingService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody HallBookingRequest bookingRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User must be logged in to make a booking.");
        }

        try {
            HallBooking savedBooking = hallBookingService.createBooking(bookingRequest, userDetails.getUsername());
            return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
        } catch (IllegalStateException | EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/hall/{hallId}/booked-dates")
    public ResponseEntity<List<LocalDate>> getBookedDates(@PathVariable Long hallId) {
        List<LocalDate> bookedDates = hallBookingService.getBookedDatesForHall(hallId);
        return ResponseEntity.ok(bookedDates);
    }
}