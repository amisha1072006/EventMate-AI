package com.eventmate.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.backend.models.Photographer;
import com.eventmate.backend.models.PhotographerBooking;
import com.eventmate.backend.models.User;
import com.eventmate.backend.payload.request.PhotographerBookingRequest;
import com.eventmate.backend.repositories.PhotographerBookingRepository;
import com.eventmate.backend.repositories.PhotographerRepository;
import com.eventmate.backend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PhotographerBookingService {

    @Autowired
    private PhotographerBookingRepository bookingRepository;
    
    @Autowired
    private PhotographerRepository photographerRepository;
    
    @Autowired
    private UserRepository userRepository; // User ko link karne ke liye

    // --- YEH METHOD BOOKING KAREGA ---
    // (Note: userEmail ko Spring Security se lena hoga, abhi hardcode kar rahe hain)
    public PhotographerBooking createBooking(PhotographerBookingRequest request, String userEmail) {
        
        LocalDate bookingDate = request.bookingDate();
        Long photographerId = request.photographerId();

        // 1. Check karein ki photographer booked hai ya nahi
        boolean isBooked = bookingRepository.existsByPhotographer_PhotographerIdAndBookingDate(photographerId, bookingDate);

        if (isBooked) {
            // Agar booked hai, toh booking na karein aur error dein
            throw new IllegalStateException("Photographer is already booked on this date.");
        }

        // 2. Agar booked nahi hai, toh booking create karein
        Photographer photographer = photographerRepository.findById(photographerId)
                .orElseThrow(() -> new EntityNotFoundException("Photographer not found"));
        
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        PhotographerBooking newBooking = new PhotographerBooking();
        newBooking.setPhotographer(photographer);
        newBooking.setUser(user);
        newBooking.setBookingDate(bookingDate);
        newBooking.setUserName(request.userName());
        newBooking.setUserPhone(request.userPhone());
        newBooking.setEventType(request.eventType());
        
        return bookingRepository.save(newBooking);
    }

    // --- YEH METHOD SUGGESTIONS DEGA ---
    public List<Photographer> getAvailablePhotographers(LocalDate date) {
        // 1. Uss date par sabhi booked IDs nikaalein
        List<Long> bookedIds = bookingRepository.findBookedPhotographerIdsOnDate(date);

        if (bookedIds.isEmpty()) {
            // Agar koi booked nahi hai, toh sabko return kar dein
            return photographerRepository.findAll();
        } else {
            // Warna, booked IDs ko chhod kar baaki sabko return karein
            return photographerRepository.findByPhotographerIdNotIn(bookedIds);
        }
    }
}