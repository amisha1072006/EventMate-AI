// File Location: src/main/java/com/eventmate/backend/repositories/HallRepository.java

// package com.eventmate.backend.repositories;

// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.eventmate.backend.models.Hall; // List को import करें

// @Repository
// public interface HallRepository extends JpaRepository<Hall, Long> {

//     // --- START: NEW METHOD FOR SUGGESTIONS ---
//     /**
//      * Finds all Halls whose hallId is NOT present in the provided list of IDs.
//      * Useful for finding available halls.
//      */
//     List<Hall> findByHallIdNotIn(List<Long> hallIds);
//     // --- END: NEW METHOD FOR SUGGESTIONS ---
// }
package com.eventmate.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.eventmate.backend.models.Hall; // Yeh import zaroori hai

@Repository
public interface HallRepository extends JpaRepository<Hall, Long> {

    // --- YEH NAYI LINE HAI CHATBOT KE LIYE ---
    // Yeh method unn sabhi halls ko dhoondhega jinki ID
    // di gayi 'bookedHallIds' ki list mein NAHI hai.
    List<Hall> findByHallIdNotIn(List<Long> bookedHallIds);

    // --- BAAKI METHODS ---
    // Aapko 'findAll()' ya 'findById()' yahaan likhne ki zaroorat nahi hai
    // kyunki 'JpaRepository' woh saare methods pehle se hi provide karta hai.
    // Aapka HallController unhein direct use kar sakta hai.
    
    // Yeh method database mein 'eventType' column se match karke venues ki list nikalega
    List<Hall> findByEventType(String eventType);
    // Yeh method Hall ko uske naam se dhoondhega (case-insensitive)
    Optional<Hall> findByHallNameIgnoreCase(String hallName);
    // Dynamic Query for multiple optional filters
    @Query("SELECT h FROM Hall h WHERE " +
           "(:location IS NULL OR LOWER(h.location) = LOWER(:location)) AND " +
           "(:eventType IS NULL OR LOWER(h.eventType)=LOWER(:eventType)) AND" +
           "(:food IS NULL OR h.food = :food OR h.food = 'Both') AND " + // 'Both' ko bhi include karega agar Veg/Non-Veg poocha hai
           "(:minBudget IS NULL OR h.budget >= :minBudget) AND " +
           "(:maxBudget IS NULL OR h.budget <= :maxBudget) AND " +
           "(:minCapacity IS NULL OR h.capacity >= :minCapacity) AND " +
           "(:maxCapacity IS NULL OR h.capacity <= :maxCapacity)")
    List<Hall> findWithFilters(
            @Param("location") String location,
            @Param("food") String food,
            @Param("minBudget") Integer minBudget,
            @Param("maxBudget") Integer maxBudget,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("eventType") String eventType
    );

}