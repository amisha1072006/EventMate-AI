package com.eventmate.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.backend.models.Photographer; // 💥 यह Import जोड़ें

@Repository
public interface PhotographerRepository extends JpaRepository<Photographer, Long> {
    
    // (आपके पास शायद पहले से ही 'findByPhotographerIdNotIn' जैसा मेथड होगा, उसे रहने दें)
    List<Photographer> findByPhotographerIdNotIn(List<Long> photographerIds);

    /**
     * 💥 यह नया मेथड जोड़ें:
     * फोटोग्राफर को उसके नाम से खोजने के लिए (जैसे "riya photography" को "Riya Photography" से मैच करेगा)
     */
    Optional<Photographer> findByNameContainingIgnoreCase(String name);
}

// package com.eventmate.backend.repositories;
// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.eventmate.backend.models.Photographer; // Zaroori import list ke liye

// @Repository
// public interface PhotographerRepository extends JpaRepository<Photographer, Long> {

//     // ... (Aapke puraane methods yahaan ho sakte hain, jaise findByLocation etc.)

//     // --- YEH NAYA METHOD HAI SUGGESTIONS KE LIYE ---
//     /**
//      * Finds all Photographers whose photographerId is NOT present in the provided list of IDs.
//      * Useful for finding available photographers.
//      * @param bookedIds A list of IDs for photographers who are already booked.
//      * @return A list of available Photographers.
//      */
//     List<Photographer> findByPhotographerIdNotIn(List<Long> bookedIds);
// }
