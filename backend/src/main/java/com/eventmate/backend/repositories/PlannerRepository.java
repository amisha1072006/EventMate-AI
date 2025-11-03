// package com.eventmate.backend.repositories;

// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.eventmate.backend.models.Planner;

// public interface PlannerRepository extends JpaRepository<Planner, Long> {

//     // Available Planners nikalne ke liye
//     List<Planner> findByPlannerIdNotIn(List<Long> bookedIds);
// }

package com.eventmate.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; // 💥 यह Import जोड़ें

import com.eventmate.backend.models.Planner; // 💥 यह Import जोड़ें

@Repository
public interface PlannerRepository extends JpaRepository<Planner, Long> {
    
    // (आपके पास शायद पहले से ही 'findByPlannerIdNotIn' जैसा मेथड होगा, उसे रहने दें)
    List<Planner> findByPlannerIdNotIn(List<Long> plannerIds);

    /**
     * 💥 नया मेथड:
     * प्लानर को उसके नाम से खोजने के लिए (जैसे "priya singh" को "Priya Singh" से मैच करेगा)
     */
    Optional<Planner> findByNameContainingIgnoreCase(String name);

    /**
     * 💥 नया मेथड:
     * चैटबॉट को सभी प्लानर्स के नाम पता होने चाहिए, इसलिए यह मेथड जरूरी है।
     */
    @Override
    List<Planner> findAll();
}
