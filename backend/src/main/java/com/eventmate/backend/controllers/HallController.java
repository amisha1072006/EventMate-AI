// File Location: src/main/java/com/eventmate/backend/controllers/HallController.java

package com.eventmate.backend.controllers;

import com.eventmate.backend.models.Hall;
import com.eventmate.backend.repositories.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <-- NEW IMPORT
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; // <-- NEW IMPORT
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class HallController {

    @Autowired
    private HallRepository hallRepository;

    // This existing method gets ALL halls
    @GetMapping
    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }

    // --- NEW METHOD ADDED BELOW ---
    // This new method gets a SINGLE hall by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Hall> getHallById(@PathVariable Long id) {
        // Find the hall in the database
        // If found, return it with a 200 OK status
        // If not found, return a 404 Not Found status
        return hallRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}