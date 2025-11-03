package com.eventmate.backend.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.backend.models.Planner;
import com.eventmate.backend.models.PlannerBooking;
import com.eventmate.backend.payload.request.PlannerBookingRequest;
import com.eventmate.backend.repositories.PlannerRepository;
import com.eventmate.backend.service.PlannerBookingService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/planners")
@CrossOrigin(origins = "*") 
public class PlannerBookingController {

    @Autowired private PlannerBookingService bookingService;
    @Autowired private PlannerRepository plannerRepository;

    // --- 1. Planner Details Fetching ---
    // Endpoint: GET /api/planners/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Planner> getPlannerById(@PathVariable Long id) {
        Optional<Planner> planner = plannerRepository.findById(id);
        return planner.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // --- 2. Planner Booking Creation ---
    // Endpoint: POST /api/planners/book
    @PostMapping("/book")
    public ResponseEntity<?> bookPlanner(@RequestBody PlannerBookingRequest request) {
        try {
            // User email nikalna (Security context se)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = ((UserDetails) authentication.getPrincipal()).getUsername();

            PlannerBooking booking = bookingService.createBooking(request, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
            
        } catch (IllegalStateException e) {
            // 💥 409 CONFLICT FIX: Agar planner booked hai
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "This planner is already booked on this date."));
                    
        } catch (EntityNotFoundException e) {
            // 404 NOT FOUND FIX: Agar Planner ya User nahi mila
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            // 400 BAD REQUEST: Any other general error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Error creating booking: " + e.getMessage()));
        }
    }

    // --- 3. Available Planners Fetching (For Suggestions) ---
    // Endpoint: GET /api/planners/available?date=YYYY-MM-DD
    @GetMapping("/available")
    // 💥 FIX: Return type mein Generic Type <List<Planner>> add kiya gaya hai
    public ResponseEntity<List<Planner>> getAvailablePlanners(@RequestParam("date") LocalDate date) {
        
        List<Planner> available = bookingService.getAvailablePlanners(date);
        if (available.isEmpty()) {
            // 204 NO CONTENT: Agar koi planner available nahi hai
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        // 200 OK: Available Planners return karein
        return ResponseEntity.ok(available);
    }
}

// package com.eventmate.backend.controllers;

// import java.time.LocalDate;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.eventmate.backend.models.Planner;
// import com.eventmate.backend.models.PlannerBooking;
// import com.eventmate.backend.payload.request.PlannerBookingRequest;
// import com.eventmate.backend.repositories.PlannerRepository;
// import com.eventmate.backend.service.PlannerBookingService;

// import jakarta.persistence.EntityNotFoundException;

// @RestController
// @RequestMapping("/api/planners")
// @CrossOrigin(origins = "*") 
// public class PlannerBookingController {

//     @Autowired private PlannerBookingService bookingService;
//     @Autowired private PlannerRepository plannerRepository;

//     // --- 1. Planner Details Fetching ---
//     // Endpoint: GET /api/planners/{id}
//     @GetMapping("/{id}")
//     public ResponseEntity<Planner> getPlannerById(@PathVariable Long id) {
//         Optional<Planner> planner = plannerRepository.findById(id);
//         return planner.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
//                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//     }
    
//     // --- 2. Planner Booking Creation ---
//     // Endpoint: POST /api/planners/book
//     @PostMapping("/book")
//     public ResponseEntity<?> bookPlanner(@RequestBody PlannerBookingRequest request) {
//         try {
//             // User email nikalna (Security context se)
//             Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//             String userEmail = ((UserDetails) authentication.getPrincipal()).getUsername();

//             PlannerBooking booking = bookingService.createBooking(request, userEmail);
//             return ResponseEntity.status(HttpStatus.CREATED).body(booking);
            
//         } catch (IllegalStateException e) {
//             // 💥 409 CONFLICT FIX: Agar planner booked hai
//             return ResponseEntity
//                     .status(HttpStatus.CONFLICT)
//                     .body(Map.of("message", "This planner is already booked on this date."));
                    
//         } catch (EntityNotFoundException e) {
//             // 404 NOT FOUND FIX: Agar Planner ya User nahi mila
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
//         } catch (Exception e) {
//             // 400 BAD REQUEST: Any other general error
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Error creating booking: " + e.getMessage()));
//         }
//     }

//     // --- 3. Available Planners Fetching (For Suggestions) ---
//     // Endpoint: GET /api/planners/available?date=YYYY-MM-DD
//     @GetMapping("/available")
//     // 💥 FIX: Return type mein Generic Type <List<Planner>> add kiya gaya hai
//     public ResponseEntity<List<Planner>> getAvailablePlanners(@RequestParam("date") LocalDate date) {
        
//         List<Planner> available = bookingService.getAvailablePlanners(date);
//         if (available.isEmpty()) {
//             // 204 NO CONTENT: Agar koi planner available nahi hai
//             return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//         }
//         // 200 OK: Available Planners return karein
//         return ResponseEntity.ok(available);
//     }
// }