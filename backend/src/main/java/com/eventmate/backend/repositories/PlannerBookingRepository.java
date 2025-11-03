// package com.eventmate.backend.repositories;

// import java.time.LocalDate;
// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import com.eventmate.backend.models.PlannerBooking;

// public interface PlannerBookingRepository extends JpaRepository<PlannerBooking, Long> {

//     // Double booking check
//     boolean existsByPlanner_PlannerIdAndBookingDate(Long plannerId, LocalDate bookingDate);

//     // Booked Planners ki IDs nikalne ke liye
//     @Query("SELECT pb.planner.plannerId FROM PlannerBooking pb WHERE pb.bookingDate = :date")
//     List<Long> findBookedPlannerIdsOnDate(@Param("date") LocalDate date);
// }


package com.eventmate.backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository; // 💥 यह Import जोड़ें

import com.eventmate.backend.models.PlannerBooking; // 💥 यह Import जोड़ें

@Repository
public interface PlannerBookingRepository extends JpaRepository<PlannerBooking, Long> {

    /**
     * 💥 मेथड 1:
     * यह चेक करता है कि कोई प्लानर किसी खास तारीख को पहले से बुक है या नहीं।
     */
    boolean existsByPlanner_PlannerIdAndBookingDate(Long plannerId, LocalDate bookingDate);

    /**
     * 💥 मेथड 2:
     * यह किसी खास तारीख पर सभी बुक हो चुके प्लानर्स की ID लिस्ट देता है।
     */
    @Query("SELECT pb.planner.plannerId FROM PlannerBooking pb WHERE pb.bookingDate = :date")
    List<Long> findBookedPlannerIdsOnDate(@Param("date") LocalDate date);
    
}