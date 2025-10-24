package com.eventmate.backend.controllers;

import java.time.LocalDate; 
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;      
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.backend.models.Hall; 
import com.eventmate.backend.models.HallBooking;
import com.eventmate.backend.payload.request.HallBookingRequest;
import com.eventmate.backend.repositories.HallBookingRepository;
import com.eventmate.backend.repositories.HallRepository;
import com.eventmate.backend.service.HallBookingService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class HallBookingController {

    private final HallBookingService hallBookingService;

    @Autowired
    private HallBookingRepository hallBookingRepository;

    @Autowired
    private HallRepository hallRepository;
    
    public HallBookingController(HallBookingService hallBookingService) {
        this.hallBookingService = hallBookingService;
    }

    // --- START: DTO Classes for Conflict Response ---
    // (Nested static classes defined inside the controller)
    public static class BookingConflictResponse {
        private String message;
        private List<HallSuggestion> suggestions;
        public BookingConflictResponse(String message, List<HallSuggestion> suggestions) { this.message = message; this.suggestions = suggestions; }
        public String getMessage() { return message; }
        public List<HallSuggestion> getSuggestions() { return suggestions; }
    }

    public static class HallSuggestion {
        private Long id;
        private String name;
        private String imageLink;
        private String location;  // --- ADDED ---
        private Integer capacity; // --- ADDED ---
        private Integer budget;   // --- ADDED --- (Aapke Hall model ke hisab se type Integer ya Double ho sakta hai)

        // --- UPDATED Constructor ---
        public HallSuggestion(Long id, String name, String imageLink, String location, Integer capacity, Integer budget) {
            this.id = id;
            this.name = name;
            this.imageLink = imageLink;
            this.location = location;   // --- ADDED ---
            this.capacity = capacity;   // --- ADDED ---
            this.budget = budget;     // --- ADDED ---
        }
        
        // Getters
        public Long getId() { return id; }
        public String getName() { return name; }
        public String getImageLink() { return imageLink; }
        
        // --- ADDED Getters ---
        public String getLocation() { return location; }
        public Integer getCapacity() { return capacity; }
        public Integer getBudget() { return budget; }
    }
    // --- END: DTO Classes ---


    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody HallBookingRequest bookingRequest,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User must be logged in to make a booking.");
        }

        // --- START: CONFLICT CHECKING AND SUGGESTION LOGIC ---
        LocalDate requestedDate;
        Long requestedHallId;

        if (bookingRequest == null || bookingRequest.bookingTime() == null || bookingRequest.hallId() == null) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid booking request data.");
        }
        try {
            requestedDate = bookingRequest.bookingTime().toLocalDate();
            requestedHallId = bookingRequest.hallId();
        } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date or hall ID format in request.");
        }


        boolean alreadyBooked = hallBookingRepository.existsBookingOnDate(requestedHallId, requestedDate);

        if (alreadyBooked) {
            List<Long> bookedHallIds = hallBookingRepository.findBookedHallIdsOnDate(requestedDate);
            List<Hall> availableHalls = hallRepository.findByHallIdNotIn(bookedHallIds);

            // --- UPDATED Stream to include new fields ---
            List<HallSuggestion> suggestions = availableHalls.stream()
                    .map(hall -> new HallSuggestion(
                            hall.getHallId(),      
                            hall.getHallName(),    
                            hall.getImageLink(),
                            hall.getLocation(),    // --- ADDED --- (Assume Hall.java has getLocation())
                            hall.getCapacity(),    // --- ADDED --- (Assume Hall.java has getCapacity())
                            hall.getBudget()       // --- ADDED --- (Assume Hall.java has getBudget())
                    ))
                    //.limit(5) 
                    .collect(Collectors.toList());

            BookingConflictResponse responseBody = new BookingConflictResponse(
                    "Booking failed. This hall is already booked for the selected date.",
                    suggestions
            );
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);

        } else {
            // --- END: CONFLICT CHECKING LOGIC ---

            try {
                HallBooking savedBooking = hallBookingService.createBooking(bookingRequest, userDetails.getUsername());
                return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
            } catch (IllegalStateException | EntityNotFoundException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            } catch (Exception e) {
                 System.err.println("Error during booking creation: " + e.getMessage()); 
                 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred during booking.");
            }
        }
    }

    @GetMapping("/hall/{hallId}/booked-dates")
    public ResponseEntity<List<LocalDate>> getBookedDates(@PathVariable Long hallId) {
        try {
            List<LocalDate> bookedDates = hallBookingService.getBookedDatesForHall(hallId);
            return ResponseEntity.ok(bookedDates);
        } catch (Exception e) {
            System.err.println("Error fetching booked dates: " + e.getMessage()); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of()); 
        }
    }
}