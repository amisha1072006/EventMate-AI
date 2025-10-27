package com.eventmate.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventmate.backend.models.Planner;

public interface PlannerRepository extends JpaRepository<Planner, Long> {

    // Available Planners nikalne ke liye
    List<Planner> findByPlannerIdNotIn(List<Long> bookedIds);
}
