package com.eventmate.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.eventmate.backend.payload.request.HallBookingRequest;
import com.eventmate.backend.models.HallBooking;
import com.eventmate.backend.service.HallBookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class HallBookingController {

    private final HallBookingService hallBookingService;

    public HallBookingController(HallBookingService hallBookingService) {
        this.hallBookingService = hallBookingService;
    }

    @PostMapping
    public ResponseEntity<HallBooking> createBooking(@RequestBody HallBookingRequest bookingRequest) {
        // --- DEBUGGING LINE ---
        System.out.println("Received booking request: " + bookingRequest.toString());
        // --------------------

        HallBooking savedBooking = hallBookingService.createBooking(bookingRequest);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }
}