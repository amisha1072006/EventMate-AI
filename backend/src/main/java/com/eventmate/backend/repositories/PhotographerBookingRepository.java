package com.eventmate.backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.eventmate.backend.models.PhotographerBooking;

@Repository
public interface PhotographerBookingRepository extends JpaRepository<PhotographerBooking, Long> {

    /**
     * 💥 यह मेथड जोड़ें (अगर पहले से मौजूद नहीं है):
     * यह चेक करता है कि कोई फोटोग्राफर किसी खास तारीख को पहले से बुक है या नहीं।
     */
    boolean existsByPhotographer_PhotographerIdAndBookingDate(Long photographerId, LocalDate bookingDate);

    /**
     * 💥 यह मेथड जोड़ें (अगर पहले से मौजूद नहीं है):
     * यह किसी खास तारीख पर सभी बुक हो चुके फोटोग्राफर्स की ID लिस्ट देता है।
     */
    @Query("SELECT pb.photographer.photographerId FROM PhotographerBooking pb WHERE pb.bookingDate = :date")
    List<Long> findBookedPhotographerIdsOnDate(@Param("date") LocalDate date);
}


// package com.eventmate.backend.repositories;


// import java.time.LocalDate;
// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
// import org.springframework.stereotype.Repository;

// import com.eventmate.backend.models.PhotographerBooking;

// @Repository
// public interface PhotographerBookingRepository extends JpaRepository<PhotographerBooking, Long> {

//     // 1. Check karne ke liye ki ek photographer uss date ko booked hai ya nahi
//     boolean existsByPhotographer_PhotographerIdAndBookingDate(Long photographerId, LocalDate bookingDate);

//     // 2. Uss date par sabhi booked photographers ki ID nikaalne ke liye (suggestions ke liye)
//     @Query("SELECT pb.photographer.photographerId FROM PhotographerBooking pb WHERE pb.bookingDate = :date")
//     List<Long> findBookedPhotographerIdsOnDate(@Param("date") LocalDate date);
// }