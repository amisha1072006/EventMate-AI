package com.eventmate.backend.service;

import org.springframework.stereotype.Service;
import com.eventmate.backend.payload.request.HallBookingRequest;
import com.eventmate.backend.models.Hall;
import com.eventmate.backend.models.HallBooking;
import com.eventmate.backend.repositories.HallBookingRepository;
import com.eventmate.backend.repositories.HallRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class HallBookingService {

    private final HallBookingRepository hallBookingRepository;
    private final HallRepository hallRepository;

    public HallBookingService(HallBookingRepository hallBookingRepository, HallRepository hallRepository) {
        this.hallBookingRepository = hallBookingRepository;
        this.hallRepository = hallRepository;
    }

    public HallBooking createBooking(HallBookingRequest bookingRequest) {
        // 1. Find the hall that the booking is for
        Hall hall = hallRepository.findById(bookingRequest.hallId())
                .orElseThrow(() -> new EntityNotFoundException("Hall not found with ID: " + bookingRequest.hallId()));

        // 2. Create a new Booking entity with the data
        HallBooking booking = new HallBooking();
        booking.setUserName(bookingRequest.userName());
        booking.setUserPhone(bookingRequest.userPhone());
        booking.setBookingTime(bookingRequest.bookingTime());
        booking.setHall(hall); // Link the booking to the hall

        // 3. Save the booking to the database and return it
        return hallBookingRepository.save(booking);
    }
}