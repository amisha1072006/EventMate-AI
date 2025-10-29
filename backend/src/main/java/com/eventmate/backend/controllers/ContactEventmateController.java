package com.eventmate.backend.controllers;

import com.eventmate.backend.models.ContactEventmate;
import com.eventmate.backend.repositories.ContactEventmateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact-eventmate")
@CrossOrigin(origins = "http://localhost:5173") // Allow React (frontend) access
public class ContactEventmateController {

    @Autowired
    private ContactEventmateRepository contactEventmateRepository;

    // ✅ Save contact form data to database
    @PostMapping("/send")
    public String saveContactMessage(@RequestBody ContactEventmate contactEventmate) {
        contactEventmateRepository.save(contactEventmate);
        return "Message saved successfully!";
    }
}
