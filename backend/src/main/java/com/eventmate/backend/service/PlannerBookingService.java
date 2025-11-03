//    package com.eventmate.backend.service;

// import java.time.LocalDate;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.eventmate.backend.models.Planner;
// import com.eventmate.backend.models.PlannerBooking;
// import com.eventmate.backend.models.User;
// import com.eventmate.backend.payload.request.PlannerBookingRequest;
// import com.eventmate.backend.repositories.PlannerBookingRepository;
// import com.eventmate.backend.repositories.PlannerRepository;
// import com.eventmate.backend.repositories.UserRepository;

// import jakarta.persistence.EntityNotFoundException;

// @Service
// public class PlannerBookingService {

//     @Autowired private PlannerBookingRepository bookingRepository;
//     @Autowired private PlannerRepository plannerRepository;
//     @Autowired private UserRepository userRepository; // Assume UserRepository exists

//     public PlannerBooking createBooking(PlannerBookingRequest request, String userEmail) {
        
//         LocalDate bookingDate = request.bookingDate();
//         Long plannerId = request.plannerId();

//         // 1. Double booking check (409 Conflict logic)
//         boolean isBooked = bookingRepository.existsByPlanner_PlannerIdAndBookingDate(plannerId, bookingDate);
//         if (isBooked) {
//             throw new IllegalStateException("This planner is already booked on this date.");
//         }

//         // 2. Fetch Entities
//         Planner planner = plannerRepository.findById(plannerId)
//                 .orElseThrow(() -> new EntityNotFoundException("Planner not found"));
//         User user = userRepository.findByEmail(userEmail)
//                 .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
//         // 3. Create Booking
//         PlannerBooking newBooking = new PlannerBooking();
//         newBooking.setPlanner(planner);
//         newBooking.setUser(user);
//         newBooking.setBookingDate(bookingDate);
//         newBooking.setUserName(request.userName());
//         newBooking.setUserPhone(request.userPhone());
//         newBooking.setEventType(request.eventType());
        
//         return bookingRepository.save(newBooking);
//     }

//     public List<Planner> getAvailablePlanners(LocalDate date) {
//         List<Long> bookedIds = bookingRepository.findBookedPlannerIdsOnDate(date);

//         if (bookedIds.isEmpty()) {
//             return plannerRepository.findAll();
//         } else {
//             return plannerRepository.findByPlannerIdNotIn(bookedIds);
//         }
//     }
// }
 




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
    @Autowired private UserRepository userRepository; 

    // ... आपका 'createBooking' मेथड यहाँ पहले जैसा ही रहेगा ...
    public PlannerBooking createBooking(PlannerBookingRequest request, String userEmail) {
        
        LocalDate bookingDate = request.bookingDate();
        Long plannerId = request.plannerId();

        // 1. Double booking check
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

    // ... आपका 'getAvailablePlanners' मेथड यहाँ पहले जैसा ही रहेगा ...
    public List<Planner> getAvailablePlanners(LocalDate date) {
        List<Long> bookedIds = bookingRepository.findBookedPlannerIdsOnDate(date);

        if (bookedIds.isEmpty()) {
            return plannerRepository.findAll();
        } else {
            return plannerRepository.findByPlannerIdNotIn(bookedIds);
        }
    }
    
    /**
     * 💥 नया मेथड:
     * ChatController इसका इस्तेमाल यह चेक करने के लिए करेगा कि कोई प्लानर उपलब्ध है या नहीं।
     * यह 'true' (उपलब्ध है) या 'false' (उपलब्ध नहीं है) रिटर्न करता है।
     */
    public boolean isPlannerAvailable(Long plannerId, LocalDate date) {
        // अगर प्लानर बुक नहीं है (!isBooked), तो वह उपलब्ध (available) है।
        return !bookingRepository.existsByPlanner_PlannerIdAndBookingDate(plannerId, date);
    }
}