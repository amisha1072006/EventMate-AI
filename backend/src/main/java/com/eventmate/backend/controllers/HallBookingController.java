package com.eventmate.backend.controllers;

import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.eventmate.backend.models.Hall;
import com.eventmate.backend.models.HallBooking;
import com.eventmate.backend.models.User;
import com.eventmate.backend.payload.request.HallBookingRequest;
import com.eventmate.backend.repositories.HallBookingRepository;
import com.eventmate.backend.repositories.HallRepository;
import com.eventmate.backend.repositories.UserRepository;
import com.eventmate.backend.service.HallBookingService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class HallBookingController {

    private final HallBookingService hallBookingService;

    @Autowired
    private HallBookingRepository hallBookingRepository;

    @Autowired
    private HallRepository hallRepository;

    @Autowired
    private UserRepository userRepository;

    public HallBookingController(HallBookingService hallBookingService) {
        this.hallBookingService = hallBookingService;
    }

    // --- existing createBooking and other endpoints kept unchanged ---
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody HallBookingRequest bookingRequest,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User must be logged in to make a booking.");
        }

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

            List<HallSuggestion> suggestions = availableHalls.stream()
                    .map(hall -> new HallSuggestion(
                            hall.getHallId(),
                            hall.getHallName(),
                            hall.getImageLink(),
                            hall.getLocation(),
                            hall.getCapacity(),
                            hall.getBudget()
                    ))
                    .limit(5)
                    .collect(Collectors.toList());

            BookingConflictResponse responseBody = new BookingConflictResponse(
                    "Booking failed. This hall is already booked for the selected date.",
                    suggestions
            );
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);

        } else {
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

    // ---------- DTO classes for conflict suggestions (kept) ----------
    public static class BookingConflictResponse {
        private String message;
        private List<HallSuggestion> suggestions;
        public BookingConflictResponse(String message, List<HallSuggestion> suggestions) {
            this.message = message;
            this.suggestions = suggestions;
        }
        public String getMessage() { return message; }
        public List<HallSuggestion> getSuggestions() { return suggestions; }
    }

    public static class HallSuggestion {
        private Long id;
        private String name;
        private String imageLink;
        private String location;
        private Integer capacity;
        private Integer budget;
        public HallSuggestion(Long id, String name, String imageLink, String location, Integer capacity, Integer budget) {
            this.id = id; this.name = name; this.imageLink = imageLink; this.location = location; this.capacity = capacity; this.budget = budget;
        }
        public Long getId() { return id; }
        public String getName() { return name; }
        public String getImageLink() { return imageLink; }
        public String getLocation() { return location; }
        public Integer getCapacity() { return capacity; }
        public Integer getBudget() { return budget; }
    }

    // ---------- BookingDetails DTO for frontend ----------
    public static class BookingDetails {
        private Long hallId;
        private String hallName;
        private String hallAddress;
        private String bookingDateTime; // ISO or formatted string

        public BookingDetails(Long hallId, String hallName, String hallAddress, String bookingDateTime) {
            this.hallId = hallId;
            this.hallName = hallName;
            this.hallAddress = hallAddress;
            this.bookingDateTime = bookingDateTime;
        }

        public Long getHallId() { return hallId; }
        public String getHallName() { return hallName; }
        public String getHallAddress() { return hallAddress; }
        public String getBookingDateTime() { return bookingDateTime; }
    }

    private static final DateTimeFormatter FLAT_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    // ---------- NEW ENDPOINT: Get details for current authenticated user ----------
    @GetMapping("/user/details")
    public ResponseEntity<List<BookingDetails>> getBookingDetailsForCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(List.of());
        }
        try {
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));

            List<HallBooking> bookings = hallBookingService.getBookingsByUserWithHall(user.getId());
            List<BookingDetails> details = bookings.stream()
                    .map(b -> {
                        var h = b.getHall();
                        String addr = (h != null ? (h.getLocation() != null ? h.getLocation() : h.getEventType()) : "");
                        String dateTime = b.getBookingTime() != null ? b.getBookingTime().format(FLAT_FORMATTER) : "";
                        return new BookingDetails(h != null ? h.getHallId() : null,
                                                  h != null ? h.getHallName() : "Hall",
                                                  addr,
                                                  dateTime);
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(details);
        } catch (Exception e) {
            System.err.println("Error in getBookingDetailsForCurrentUser: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    // ---------- Admin/test endpoint: details by explicit userId ----------
    @GetMapping("/user/{userId}/details")
    public ResponseEntity<List<BookingDetails>> getBookingDetailsByUserId(@PathVariable Long userId) {
        try {
            List<HallBooking> bookings = hallBookingService.getBookingsByUserWithHall(userId);
            List<BookingDetails> details = bookings.stream()
                    .map(b -> {
                        var h = b.getHall();
                        String addr = (h != null ? (h.getLocation() != null ? h.getLocation() : h.getEventType()) : "");
                        String dateTime = b.getBookingTime() != null ? b.getBookingTime().format(FLAT_FORMATTER) : "";
                        return new BookingDetails(h != null ? h.getHallId() : null,
                                                  h != null ? h.getHallName() : "Hall",
                                                  addr,
                                                  dateTime);
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            System.err.println("Error in getBookingDetailsByUserId: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    // ---------- other endpoints (count/list) remain intact (you already have /user and /user/count etc.) ----------
}
