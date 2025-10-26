
    package com.eventmate.backend.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Service
public class ProjectKnowledgeService {

    private final Map<String, String> knowledgeBase;

    public ProjectKnowledgeService() {
        // यहाँ आपके प्रोजेक्ट के सभी फीचर्स और उनके विवरण (Descriptions) को Hardcode करें
        this.knowledgeBase = new HashMap<>();

        // 1. Backend: Entities/Models (जैसे Hall.java)
        knowledgeBase.put("hall.java", "Hall.java is the JPA Entity for venue/hall details. It stores info like name, location, capacity, and price per day. It maps to the 'halls' database table.");
        knowledgeBase.put("loginrequest.java", "LoginRequest.java is a DTO (Data Transfer Object) used to receive user credentials (username and password) from the frontend during the login process.");

        // 2. Backend: Security (जैसे JwtAuthFilter.java)
        knowledgeBase.put("jwtauthfilter.java", "JwtAuthFilter.java is a crucial Spring Security filter. Its job is to intercept every incoming request, extract the JWT token, validate it, and set the user's authentication context.");

        // 3. Frontend: Components (जैसे TrendingVenues.jsx)
        knowledgeBase.put("trendingvenues.jsx", "TrendingVenues.jsx is a React component on the user's dashboard. It fetches and displays a list of the most popular halls/venues based on booking history.");
        knowledgeBase.put("aiassistant.jsx", "AIAssistant.jsx is the main React component responsible for rendering the EventMate Bot chat interface on the frontend and sending user queries to the backend.");

        // 4. Database/Flow (जैसे Hall Booking)
        knowledgeBase.put("hall booking flow", "The hall booking flow involves the user selecting a hall, submitting a request (handled by HallBookingController), and the booking details being saved in the 'bookings' table.");
        knowledgeBase.put("user.java", "User.java is the JPA Entity for storing user data like email, password, and roles (USER or OWNER).");
    knowledgeBase.put("securityconfig.java", "SecurityConfig.java is where we configure Spring Security. It defines which endpoints are public (like /api/auth/login) and which are private.");
    knowledgeBase.put("owner", "An 'Owner' is a type of user who can register their own venues (halls) in the system. They have a separate dashboard to manage their bookings.");
    knowledgeBase.put("controller", "A 'Controller' in Spring Boot (like HallController.java) handles incoming API requests from the frontend and sends back a response.");




    
    }

    /**
     * यूजर के प्रश्न के आधार पर नॉलेज बेस से सबसे प्रासंगिक उत्तर खोजता है।
     */
    public String getAnswer(String question) {
        if (question == null || question.trim().isEmpty()) {
            return "Please ask a specific question about an EventMate feature, file, or component.";
        }

        String lowerCaseQuestion = question.toLowerCase(Locale.ROOT);

        // Key-word Matching Logic
        for (Map.Entry<String, String> entry : knowledgeBase.entrySet()) {
            // यदि प्रश्न में ज्ञान आधार (knowledge base) की कुंजी (key) शामिल है
            if (lowerCaseQuestion.contains(entry.getKey())) {
                return entry.getValue(); // वह विवरण (description) लौटाएँ
            }
        }

        // यदि कोई मैच नहीं मिला
        return "I found no specific information about '" + question + "' in the EventMate project documentation. Please try mentioning a file name (e.g., Hall.java) or a feature name (e.g., Hall Booking Flow).";
    }
}

