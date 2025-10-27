package com.eventmate.backend.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.backend.models.Photographer;
import com.eventmate.backend.models.PhotographerBooking;
import com.eventmate.backend.payload.request.PhotographerBookingRequest;
import com.eventmate.backend.repositories.PhotographerRepository;
import com.eventmate.backend.service.PhotographerBookingService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/photographers")
@CrossOrigin(origins = "*") 
public class PhotographerBookingController {

    @Autowired
    private PhotographerBookingService bookingService;
    @Autowired
    private PhotographerRepository photographerRepository;

    // --- NAYA ENDPOINT: SARE PHOTOGRAPHERS KI LIST DENA ---
    @GetMapping("/all") 
    public ResponseEntity<List<Photographer>> getAllPhotographers() {
        try {
            List<Photographer> photographers = photographerRepository.findAll();
            if (photographers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // HTTP 204
            }
            return ResponseEntity.ok(photographers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // --- YEH BOOKING ATTEMPT HANDLE KAREGA ---
    @PostMapping("/book")
    public ResponseEntity<?> bookPhotographer(@RequestBody PhotographerBookingRequest request) {
        try {
            // Spring Security पहले ही इस endpoint को सुरक्षित कर चुका होगा (401/403 त्रुटियाँ देगा यदि यूज़र लॉगिन नहीं है)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            String userEmail;
            Object principal = authentication.getPrincipal();

            if (principal instanceof UserDetails) {
                userEmail = ((UserDetails) principal).getUsername();
            } else {
                // यह स्थिति आमतौर पर तभी होती है जब security bypass हो जाए या anonymousUser हो, 
                // लेकिन SecurityConfig में .authenticated() होने पर यहाँ पहुँचने से पहले ही 401 मिल जाना चाहिए।
                throw new IllegalStateException("Authentication principal is not a UserDetails object."); 
            }

            PhotographerBooking booking = bookingService.createBooking(request, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
            
        } catch (IllegalStateException e) {
            // फोटोग्राफर पहले से बुक है (HTTP 409 Conflict)
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", e.getMessage()));
                    
        } catch (EntityNotFoundException e) {
            // फोटोग्राफर या यूज़र नहीं मिला (HTTP 404 Not Found)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            // अन्य त्रुटियाँ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Error creating booking: " + e.getMessage()));
        }
    }

    // --- YEH SUGGESTIONS PAGE KE LIYE DATA DEGA ---
    @GetMapping("/available")
    public ResponseEntity<List<Photographer>> getAvailablePhotographers(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        try {
            List<Photographer> available = bookingService.getAvailablePhotographers(date);
            if (available.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(available);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Yeh endpoint /api/photographers/1, /api/photographers/2, etc. ko handle karega
    @GetMapping("/{id}")
    public ResponseEntity<Photographer> getPhotographerById(@PathVariable Long id) {
        // सुनिश्चित करें कि ID शून्य (null) या शून्य से कम न हो।
        if (id == null || id <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        try {
            Optional<Photographer> photographerData = photographerRepository.findById(id);

            if (photographerData.isPresent()) {
                return new ResponseEntity<>(photographerData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}



// package com.eventmate.backend.controllers;

// import java.time.LocalDate;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.format.annotation.DateTimeFormat;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.eventmate.backend.models.Photographer;
// import com.eventmate.backend.models.PhotographerBooking;
// import com.eventmate.backend.payload.request.PhotographerBookingRequest;
// import com.eventmate.backend.repositories.PhotographerRepository;
// import com.eventmate.backend.service.PhotographerBookingService;

// import jakarta.persistence.EntityNotFoundException; // Yeh bhi add karein

// @RestController
// @RequestMapping("/api/photographers")
// @CrossOrigin(origins = "*") // CrossOrigin ko zaroorat ke hisaab se set karein
// public class PhotographerBookingController {

//     @Autowired
//     private PhotographerBookingService bookingService;
//     @Autowired
//     private PhotographerRepository photographerRepository;

//     // --- YEH BOOKING ATTEMPT HANDLE KAREGA ---
//     @PostMapping("/book")
//     public ResponseEntity<?> bookPhotographer(@RequestBody PhotographerBookingRequest request) {
//         try {
//             // --- User Email ko Spring Security se nikaalein ---
//             // Niche waali line ko uncomment karein jab security lagi ho
//             // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//             // String userEmail = authentication.getName();
            
//             // Abhi ke liye hardcoded email
//             //String userEmail = "testuser@example.com"; 
//             Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//             if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
//                 // Agar user logged in nahi hai, toh error dein
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not logged in"));
//             }

//             String userEmail;
//             Object principal = authentication.getPrincipal();

//             if (principal instanceof UserDetails) {
//                 userEmail = ((UserDetails) principal).getUsername();
//             } else {
//                 userEmail = principal.toString(); 
//             }

//             if (userEmail == null || userEmail.isEmpty()) {
//                  return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Could not determine user email"));
//             }
//             // --- NAYI LINES YAHAN KHATAM ---


//             PhotographerBooking booking = bookingService.createBooking(request, userEmail);
//             return ResponseEntity.status(HttpStatus.CREATED).body(booking);
            
//         } catch (IllegalStateException e) {
//             // --- YEH TAB CHALEGA JAB PHOTOGRAPHER BOOKED HOGA (409 Conflict) ---
//             return ResponseEntity
//                     .status(HttpStatus.CONFLICT)
//                     .body(Map.of("message", e.getMessage()));
                    
//         } catch (EntityNotFoundException e) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Error creating booking."));
//         }
//     }

//     // --- YEH SUGGESTIONS PAGE KE LIYE DATA DEGA ---
//     @GetMapping("/available")
//     public ResponseEntity<List<Photographer>> getAvailablePhotographers(
//             @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
//         try {
//             List<Photographer> available = bookingService.getAvailablePhotographers(date);
//             if (available.isEmpty()) {
//                 return ResponseEntity.noContent().build();
//             }
//             return ResponseEntity.ok(available);
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().build();
//         }
//     }
//     // --- YEH NAYA METHOD ADD KAREIN ---
//     // Yeh endpoint /api/photographers/1, /api/photographers/2, etc. ko handle karega
//     @GetMapping("/{id}")
//     public ResponseEntity<Photographer> getPhotographerById(@PathVariable Long id) {
//         try {
//             // Repository se photographer ko ID se dhoondhein
//             Optional<Photographer> photographerData = photographerRepository.findById(id);

//             if (photographerData.isPresent()) {
//                 // Agar mil gaya, toh 200 OK ke saath data bhej dein
//                 return new ResponseEntity<>(photographerData.get(), HttpStatus.OK);
//             } else {
//                 // Agar nahi mila, toh 404 Not Found bhej dein
//                 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//             }
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
//     // --- YAHAN TAK ---
    
// } // <-- Yeh class ka closing bracket hai

