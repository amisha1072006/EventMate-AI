package com.eventmate.backend.controllers;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.backend.models.Hall;
import com.eventmate.backend.models.Photographer;
import com.eventmate.backend.models.Planner;
import com.eventmate.backend.repositories.HallRepository;
import com.eventmate.backend.repositories.PhotographerRepository;
import com.eventmate.backend.repositories.PlannerRepository;
import com.eventmate.backend.service.PhotographerBookingService;
import com.eventmate.backend.service.PlannerBookingService;
import com.eventmate.backend.service.ProjectKnowledgeService;
// 💥 -------------------------- 💥

@RestController
@RequestMapping("/api/bot")
public class ChatController {
 
    // --- Hall/Venue Services ---
    private final HallRepository hallRepository;
    // --- Planner Services ---
    private final PlannerRepository plannerRepository;
    private final PlannerBookingService plannerBookingService;
    
    // --- Photographer Services ---
    private final PhotographerRepository photographerRepository;
    private final PhotographerBookingService photographerBookingService;

    // --- Fallback Service ---
    private final ProjectKnowledgeService knowledgeService;

    @Autowired
    public ChatController(ProjectKnowledgeService knowledgeService,
                         HallRepository hallRepository,
                          PlannerRepository plannerRepository,
                          PlannerBookingService plannerBookingService,
                          PhotographerRepository photographerRepository,
                          PhotographerBookingService photographerBookingService
                          ) {
        this.knowledgeService = knowledgeService;
        this.hallRepository = hallRepository;
        this.plannerRepository = plannerRepository;
        this.plannerBookingService = plannerBookingService;
        this.photographerRepository = photographerRepository;
        this.photographerBookingService = photographerBookingService;
        
        System.out.println("--- [DEBUG] EventMate Bot Initialized (V10 - All-in-One: Planners, Photographers & Venues) ---");
    }

    @PostMapping("/ask")
    public Map<String, String> askBot(@RequestBody Map<String, String> request) {
        String query = request.get("query").toLowerCase().trim();
        String answer;

        // 1. Pehle Planners/Photographers/Venues ke liye smart query check karega
        String smartAnswer = handleSmartQuery(query); 

        if (smartAnswer != null) {
            // Agar smart query se jawaab mila
            answer = smartAnswer;
        } else {
            // 2. Agar smart query se jawaab nahi mila, toh 'knowledgeService' se poochega
            answer = knowledgeService.getAnswer(query);
            
            if (answer == null || answer.toLowerCase().contains("no specific information")) {
                 answer = "I'm not sure how to answer that, but I can help with finding venues, planners, or photographers.";
            }
        }
        
        Map<String, String> response = new HashMap<>();
        response.put("answer", answer);
        return response;
    }

    // =================================================================
    // 💥 यह मुख्य 'ब्रेन' है जो सवालों को रूट करता है
    // =================================================================
    private String handleSmartQuery(String query) {
        
        // 1. जाँचें कि क्या यह फोटोग्राफर का सवाल है
        if (query.contains("photographer") || query.contains("riya") || query.contains("rajesh") || query.contains("chandan") || query.contains("aashutosh")) {
            System.out.println("[DEBUG] Routing to Photographer Logic...");
            List<Photographer> allPhotographers = this.photographerRepository.findAll();
            return answerPhotographerQuery(query, allPhotographers);
        }

        // 2. जाँचें कि क्या यह प्लानर का सवाल है
        if (query.contains("planner") || query.contains("priya") || query.contains("himanshu") || query.contains("aakash")) {
            System.out.println("[DEBUG] Routing to Planner Logic...");
            List<Planner> allPlanners = this.plannerRepository.findAll();
            return answerPlannerQuery(query, allPlanners);
        }

        // 3. जाँचें कि क्या यह वेन्यू का सवाल है
        List<Hall> allHalls = this.hallRepository.findAll();
        String venueAnswer = answerVenueQuery(query, allHalls); 
        if (venueAnswer != null) {
            System.out.println("[DEBUG] Routing to Venue Logic...");
            return venueAnswer;
        }

        // 4. अगर कुछ नहीं है, तो Fallback
        return null;
    }
    
    // =================================================================
    // 💥 वेन्यू के सवालों का जवाब देने वाला हेल्पर
    // =================================================================
    private String answerVenueQuery(String query, List<Hall> allHalls) {
        
        Hall matchedHall = null;
        for (Hall hall : allHalls) { 
            if (query.contains(hall.getName().toLowerCase())) {
                matchedHall = hall;
                break;
            }
        }

        if (matchedHall == null) {
            return null; // Fallback
        }

        if (query.contains("budget") || query.contains("price") || query.contains("cost")) {
            return matchedHall.getName() + "'s price per day is ₹" + matchedHall.getPricePerDay() + ".";
        }
        if (query.contains("location") || query.contains("where is it")) {
            return matchedHall.getName() + " is located in " + matchedHall.getLocation() + ".";
        }
        if (query.contains("capacity") || query.contains("how many guests")) {
            return matchedHall.getName() + " can hold up to " + matchedHall.getCapacity() + " guests.";
        }
        if (query.contains("food") || query.contains("catering")) {
            return matchedHall.getName() + " offers " + matchedHall.getFoodType() + " catering.";
        }
        if (query.contains("type") || query.contains("event")) {
            return matchedHall.getName() + " is best suited for " + matchedHall.getEventType() + " events.";
        }

        return "What would you like to know about " + matchedHall.getName() + "? You can ask about its budget, location, capacity, or food type.";
    }

    // =================================================================
    // 💥 प्लानर के सवालों का जवाब देने वाला हेल्पर
    // =================================================================
    private String answerPlannerQuery(String query, List<Planner> allPlanners) {
        
        // इंटेंट 0a: "planner with price range"
        Map<String, Double> priceRange = extractPriceRange(query);
        if (!priceRange.isEmpty() && !hasSpecificName(query, allPlanners.stream().map(Planner::getName).collect(Collectors.toList()))) {
            List<Planner> filtered = allPlanners.stream()
                .filter(p -> ((priceRange.get("min") == null || p.getStartingPrice() >= priceRange.get("min")) &&
                              (priceRange.get("max") == null || p.getStartingPrice() <= priceRange.get("max"))))
                .collect(Collectors.toList());
            if (filtered.isEmpty()) return "Sorry, I couldn't find any planners in that price range.";
            String names = filtered.stream().map(p -> p.getName() + " (₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
            return "Here are the planners I found in that price range:\n• " + names;
        }

        // इंटेंट 0b: "which planner is available on [date]" (Fixed)
        if ((query.contains("which planner") || query.contains("any planner") || query.contains("planners available") || query.contains("planner available")) && query.contains("available")) {
            LocalDate date = extractDate(query);
            if (date == null) return "Sure, I can check planner availability. For which date? (YYYY-MM-DD)";
            List<Planner> available = plannerBookingService.getAvailablePlanners(date);
            if (available.isEmpty()) return "Sorry, no planners are available for booking on " + date + ".";
            String names = available.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
            return "Here are the planners available on " + date + ":\n• " + names;
        }
        
        // 🔽 YEH POORA 'specialization' BLOCK BADAL DIYA GAYA HAI 🔽
        // इंटेंट 0c: "planner with specialization in [topic]" (Fixed)
        // Pehle topic nikaalein (naye helper method se)
        String topic = extractTopic(query);

        // Ab check karein ki query mein "specialize" shabd hai YA topic mila hai
        if ((query.contains("specializes in") || query.contains("specialization") || !topic.isEmpty()) 
            && !hasSpecificName(query, allPlanners.stream().map(Planner::getName).collect(Collectors.toList()))) {
            
            // Agar "specialize in" poocha par topic nahi bataya
            if (topic.isEmpty()) {
               return "Which specialization are you looking for? (e.g., weddings, corporate events)";
            }

            // Filter logic jo ab "wedding", "engagement" etc. par chalega
            List<Planner> filtered = allPlanners.stream()
                .filter(p -> p.getSpecialization() != null && p.getSpecialization().toLowerCase().contains(topic))
                .collect(Collectors.toList());
            
            if (filtered.isEmpty()) return "Sorry, I couldn't find any planners who specialize in '" + topic + "'.";
            String names = filtered.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
            return "Here are the planners who specialize in " + topic + ":\n• " + names;
        }
        // 🔼 YAHAN TAK BADLA HAI 🔼

        // इंटेंट 0d: "list of planners" (Fixed)
        if (query.contains("list of planner") || query.contains("list planner") || query.contains("show me planner") || query.contains("all planner") || query.contains("who are the planner") || query.contains("name of planner")) {
            if (allPlanners.isEmpty()) return "I don't have a list of planners at the moment.";
            if (query.contains("price") || query.contains("cost")) {
                String names = allPlanners.stream().map(p -> p.getName() + " (starts at ₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
                return "Here are the planners and their starting prices:\n• " + names;
            }
            String names = allPlanners.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
            return "Here are the planners I can help with:\n• " + names;
        }

        // इंटेंट 1: किसी एक खास प्लानर का नाम ढूँढें
        Planner matchedPlanner = null;
        for (Planner planner : allPlanners) { 
            String firstName = planner.getName().split(" ")[0].toLowerCase().trim();
            if (query.contains(firstName) && !firstName.isEmpty()) {
                matchedPlanner = planner;
                break;
            }
        }
        if (matchedPlanner == null) return null; // Fallback to KnowledgeService

        // इंटेंट 2: किसी एक खास प्लानर के बारे में सवाल
        if (query.contains("price")) return matchedPlanner.getName() + "'s starting price is ₹" + matchedPlanner.getStartingPrice() + ".";
        if (query.contains("specialization")) return matchedPlanner.getName() + " specializes in: " + matchedPlanner.getSpecialization() + ".";
        if (query.contains("rating")) return matchedPlanner.getName() + " has a rating of " + matchedPlanner.getRating() + " stars.";
        if (query.contains("available")) {
            LocalDate date = extractDate(query);
            if (date == null) return "Sure, for which date are you asking about " + matchedPlanner.getName() + "? (YYYY-MM-DD)";
            boolean isAvailable = plannerBookingService.isPlannerAvailable(matchedPlanner.getPlannerId(), date);
            return isAvailable ? "Yes, " + matchedPlanner.getName() + " is available for booking on " + date + "."
                               : "Sorry, " + matchedPlanner.getName() + " is already booked on " + date + ".";
        }
        return "What would you like to know about " + matchedPlanner.getName() + "? You can ask about price, rating, specialization, or availability.";
    }

    // =================================================================
    // 💥 फोटोग्राफर के सवालों का जवाब देने वाला हेल्पर
    // =================================================================
    private String answerPhotographerQuery(String query, List<Photographer> allPhotographers) {
        
        // इंटेंट 0a: "photographer with price range"
        Map<String, Double> priceRange = extractPriceRange(query);
        if (!priceRange.isEmpty() && !hasSpecificName(query, allPhotographers.stream().map(Photographer::getName).collect(Collectors.toList()))) {
            List<Photographer> filtered = allPhotographers.stream()
                .filter(p -> ((priceRange.get("min") == null || p.getStartingPrice() >= priceRange.get("min")) &&
                              (priceRange.get("max") == null || p.getStartingPrice() <= priceRange.get("max"))))
                .collect(Collectors.toList());
            if (filtered.isEmpty()) return "Sorry, I couldn't find any photographers in that price range.";
            String names = filtered.stream().map(p -> p.getName() + " (₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
            return "Here are the photographers I found in that price range:\n• " + names;
        }

        // इंटेंट 0b: "which photographer is available on [date]" (Fixed)
       if ((query.contains("which photographer") || query.contains("any photographer") || query.contains("photographers available") || query.contains("photographer available")) && query.contains("available")) {
            LocalDate date = extractDate(query);
            if (date == null) return "Sure, I can check photographer availability. For which date? (YYYY-MM-DD)";
            List<Photographer> available = photographerBookingService.getAvailablePhotographers(date);
            if (available.isEmpty()) return "Sorry, no photographers are available for booking on " + date + ".";
            String names = available.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
            return "Here are the photographers available on " + date + ":\n• " + names;
        }
        
        // 🔽 YEH POORA 'specialization' BLOCK BADAL DIYA GAYA HAI 🔽
        // इंटेंट 0c: "photographer with specialization in [topic]" (Fixed)
        // Pehle topic nikaalein (naye helper method se)
        String topic = extractTopic(query);

        // Ab check karein ki query mein "specialize" shabd hai YA topic mila hai
        if ((query.contains("specializes in") || query.contains("specialization") || !topic.isEmpty()) 
            && !hasSpecificName(query, allPhotographers.stream().map(Photographer::getName).collect(Collectors.toList()))) {

            if (topic.isEmpty()) {
               return "Which specialization are you looking for? (e.g., weddings, corporate)";
            }
            
            // Naya filter logic jo "specialization" aur "eventTypes" dono ko check karega
            List<Photographer> filtered = allPhotographers.stream()
                .filter(p -> {
                    // Check 'specialization' field (e.g., "Expert in Corporate event...")
                    if (p.getSpecialization() != null && p.getSpecialization().toLowerCase().contains(topic)) {
                        return true;
                    }
                    // Also check 'eventTypes' list (e.g., ["Wedding", "Corporate Event"])
                    if (p.getEventTypes() != null) {
                        for (String eventType : p.getEventTypes()) {
                            if (eventType.toLowerCase().contains(topic)) {
                                return true;
                            }
                        }
                    }
                    return false;
                })
                .collect(Collectors.toList());
                
            if (filtered.isEmpty()) return "Sorry, I couldn't find any photographers who specialize in '" + topic + "'.";
            String names = filtered.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
            return "Here are the photographers who specialize in " + topic + ":\n• " + names;
        }
        // 🔼 YAHAN TAK BADLA HAI 🔼

        // इंटेंट 0d: "list of photographers" (Fixed)
       if (query.contains("list of photographer") || query.contains("list photographer") || query.contains("show me photographer") || query.contains("all photographer") || query.contains("who are the photographer") || query.contains("name of photographer")) {
            if (allPhotographers.isEmpty()) return "I don't have a list of photographers at the moment.";
            if (query.contains("price") || query.contains("cost")) {
                String names = allPhotographers.stream().map(p -> p.getName() + " (starts at ₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
                return "Here are the photographers and their starting prices:\n• " + names;
            }
            String names = allPhotographers.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
            return "Here are the photographers I can help with:\n• " + names;
        }

        // इंटेंट 1: किसी एक खास फोटोग्राफर का नाम ढूँढें
        Photographer matchedPhotographer = null;
        for (Photographer p : allPhotographers) { 
            String firstName = p.getName().split(" ")[0].toLowerCase().trim(); // "Riya", "Rajesh", "Chandan", "Aashutosh"
            if (query.contains(firstName) && !firstName.isEmpty()) {
                matchedPhotographer = p;
                break;
            }
        }
        if (matchedPhotographer == null) return null; // Fallback

        // इंटेंट 2: किसी एक खास फोटोग्राफर के बारे में सवाल
        if (query.contains("price")) return matchedPhotographer.getName() + "'s starting price is ₹" + matchedPhotographer.getStartingPrice() + ".";
        if (query.contains("specialization")) return matchedPhotographer.getName() + " specializes in: " + matchedPhotographer.getSpecialization() + ".";
        if (query.contains("rating")) return matchedPhotographer.getName() + " has a rating of " + matchedPhotographer.getRating() + " stars.";
        if (query.contains("available")) {
            LocalDate date = extractDate(query);
            if (date == null) return "Sure, for which date are you asking about " + matchedPhotographer.getName() + "? (YYYY-MM-DD)";
            boolean isAvailable = photographerBookingService.isPhotographerAvailable(matchedPhotographer.getPhotographerId(), date);
            return isAvailable ? "Yes, " + matchedPhotographer.getName() + " is available for booking on " + date + "."
                               : "Sorry, " + matchedPhotographer.getName() + " is already booked on " + date + ".";
        }
        return "What would you like to know about " + matchedPhotographer.getName() + "? You can ask about price, rating, specialization, or availability.";
    }


    // =================================================================
    // 💥 सामान्य हेल्पर मेथड
    // =================================================================

    // हेल्पर: जाँचता है कि क्या सवाल में कोई खास नाम है
    private boolean hasSpecificName(String query, List<String> names) {
        for (String name : names) { 
            String firstName = name.split(" ")[0].toLowerCase().trim();
            if (query.contains(firstName) && !firstName.isEmpty()) {
                return true;
            }
        }
        return false;
    }

    // हेल्पर: कीमत की रेंज निकालता है
    private Map<String, Double> extractPriceRange(String query) {
        Map<String, Double> range = new HashMap<>();
        Pattern p; Matcher m;

        p = Pattern.compile("between (\\d+) and (\\d+)"); m = p.matcher(query);
        if (m.find()) { range.put("min", Double.parseDouble(m.group(1))); range.put("max", Double.parseDouble(m.group(2))); return range; }
        
        p = Pattern.compile("(\\d+)-(\\d+)"); m = p.matcher(query);
        if (m.find()) { range.put("min", Double.parseDouble(m.group(1))); range.put("max", Double.parseDouble(m.group(2))); return range; }

        p = Pattern.compile("(under|less than|max) (\\d+)"); m = p.matcher(query);
        if (m.find()) { range.put("max", Double.parseDouble(m.group(2))); return range; }

        p = Pattern.compile("(over|more than|min) (\\d+)"); m = p.matcher(query);
        if (m.find()) { range.put("min", Double.parseDouble(m.group(1))); return range; }
        
        return range;
    }
    
    // हेल्पर: तारीख निकालता है
    private LocalDate extractDate(String query) {
        Pattern p; Matcher m;

        p = Pattern.compile("(\\d{4}-\\d{2}-\\d{2})"); m = p.matcher(query);
        if (m.find()) { try { return LocalDate.parse(m.group(1)); } catch (DateTimeParseException e) {} }

        p = Pattern.compile("(\\d{1,2})[th|st|rd|nd]* (\\w+)(?: (\\d{4}))?"); m = p.matcher(query);
        if (m.find()) {
            try {
                int day = Integer.parseInt(m.group(1));
                String monthName = m.group(2);
                int year = (m.group(3) != null) ? Integer.parseInt(m.group(3)) : LocalDate.now().getYear(); 
                Month month = Month.valueOf(monthName.toUpperCase());
                return LocalDate.of(year, month, day);
            } catch (Exception e) {}
        }
        return null;
    }

    // 🔽 YEH NAYA HELPER METHOD HAI JO AAPNE ADD KIYA THA 🔽
    /**
     * Query se specialization topic (jaise "wedding") nikaalta hai.
     */
    private String extractTopic(String query) {
        if (query.contains("wedding")) return "wedding";
        if (query.contains("corporate")) return "corporate";
        if (query.contains("engagement")) return "engagement";
        if (query.contains("bday") || query.contains("birthday")) return "bday"; // Database mein "bday" se match karega
        if (query.contains("portrait")) return "portrait";
        return ""; // Koi topic nahi mila
    }
    
} // <-- Yeh ChatController class ka closing bracket hai



// package com.eventmate.backend.controllers;

// import java.time.LocalDate;
// import java.time.Month;
// import java.time.format.DateTimeParseException;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.regex.Matcher;
// import java.util.regex.Pattern;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.eventmate.backend.models.Hall;
// import com.eventmate.backend.models.Photographer;
// import com.eventmate.backend.models.Planner;
// import com.eventmate.backend.repositories.HallRepository;
// import com.eventmate.backend.repositories.PhotographerRepository;
// import com.eventmate.backend.repositories.PlannerRepository;
// import com.eventmate.backend.service.PhotographerBookingService;
// import com.eventmate.backend.service.PlannerBookingService;
// import com.eventmate.backend.service.ProjectKnowledgeService;
// // 💥 -------------------------- 💥

// @RestController
// @RequestMapping("/api/bot")
// public class ChatController {
 
//     // --- Hall/Venue Services ---
//     private final HallRepository hallRepository; // 💥 NAYA VARIABLE
//     // --- Planner Services ---
//     private final PlannerRepository plannerRepository;
//     private final PlannerBookingService plannerBookingService;
    
//     // --- Photographer Services ---
//     private final PhotographerRepository photographerRepository;
//     private final PhotographerBookingService photographerBookingService;

//     // --- Fallback Service (Yeh venues ke baare mein jaanta hai) ---
//     private final ProjectKnowledgeService knowledgeService;

//     @Autowired
//     public ChatController(ProjectKnowledgeService knowledgeService,
//                          HallRepository hallRepository, // 💥 NAYA PARAMETER
//                           PlannerRepository plannerRepository,
//                           PlannerBookingService plannerBookingService,
//                           PhotographerRepository photographerRepository,
//                           PhotographerBookingService photographerBookingService
//                           ) {
//         this.knowledgeService = knowledgeService;
//         this.hallRepository = hallRepository; // 💥 NAYA ASSIGNMENT
//         this.plannerRepository = plannerRepository;
//         this.plannerBookingService = plannerBookingService;
//         this.photographerRepository = photographerRepository;
//         this.photographerBookingService = photographerBookingService;
        
//         System.out.println("--- [DEBUG] EventMate Bot Initialized (V10 - All-in-One: Planners, Photographers & Venues) ---");
//     }

//     @PostMapping("/ask")
//     public Map<String, String> askBot(@RequestBody Map<String, String> request) {
//         String query = request.get("query").toLowerCase().trim();
//         String answer;

//         // 1. Pehle Planners/Photographers ke liye smart query check karega
//         String smartAnswer = handleSmartQuery(query); 

//         if (smartAnswer != null) {
//             // Agar smart query se jawaab mila (e.g., "Priya ki price kya hai?")
//             answer = smartAnswer;
//         } else {
//             // 2. Agar smart query se jawaab nahi mila, toh 'knowledgeService' se poochega (e.g., "venues dikhao")
//             answer = knowledgeService.getAnswer(query);
            
//             // 💥 YAHAN BADLAAV KIYA GAYA HAI 💥
//             // Humne 'venues' wale check ko hata diya hai.
//             // Ab yeh sirf tabhi fallback dega jab knowledgeService 'null' ya 'no specific info' bhejega.
//             if (answer == null || answer.toLowerCase().contains("no specific information")) {
//                  answer = "I'm not sure how to answer that, but I can help with finding venues, planners, or photographers.";
//             }
//         }
        
//         Map<String, String> response = new HashMap<>();
//         response.put("answer", answer);
//         return response;
//     }

//     // =================================================================
//     // 💥 यह मुख्य 'ब्रेन' है जो प्लानर/फोटोग्राफर के सवालों को रूट करता है
//     // =================================================================
//     private String handleSmartQuery(String query) {
        
//         // 1. जाँचें कि क्या यह फोटोग्राफर का सवाल है
//         if (query.contains("photographer") || query.contains("riya") || query.contains("rajesh") || query.contains("chandan") || query.contains("aashutosh")) {
//             System.out.println("[DEBUG] Routing to Photographer Logic...");
//             List<Photographer> allPhotographers = this.photographerRepository.findAll();
//             return answerPhotographerQuery(query, allPhotographers);
//         }

//         // 2. जाँचें कि क्या यह प्लानर का सवाल है
//         if (query.contains("planner") || query.contains("priya") || query.contains("himanshu") || query.contains("aakash")) {
//             System.out.println("[DEBUG] Routing to Planner Logic...");
//             List<Planner> allPlanners = this.plannerRepository.findAll();
//             return answerPlannerQuery(query, allPlanners);
//         }
//         // 💥 ----- NAYA LOGIC ----- 💥
//         // 3. जाँचें कि क्या यह वेन्यू का सवाल है
//         List<Hall> allHalls = this.hallRepository.findAll();
//         // (Yeh function neeche add kiya gaya hai)
//         String venueAnswer = answerVenueQuery(query, allHalls); 
//         if (venueAnswer != null) {
//             System.out.println("[DEBUG] Routing to Venue Logic...");
//             return venueAnswer;
//         }
//         // 💥 -------------------- 💥

//         // 3. अगर दोनों नहीं हैं, तो Fallback (taaki knowledgeService venues check kar sake)
//         return null;
//     }
//     // 💥 ----- YEH POORA METHOD NAYA HAI ----- 💥
//     // 💥 वेन्यू के सवालों का जवाब देने वाला हेल्पर
//     // =================================================================
//     private String answerVenueQuery(String query, List<Hall> allHalls) {
        
//         // Intent 1: Sawaal mein ek khaas venue ka naam dhoondhein
//         Hall matchedHall = null;
//         for (Hall hall : allHalls) { 
//             // Hall ka naam (e.g., "The Skyview Terrace") ko lowercase mein check karein
//             if (query.contains(hall.getName().toLowerCase())) {
//                 matchedHall = hall;
//                 break;
//             }
//         }

//         // Agar query mein kisi khaas hall ka naam nahi hai, toh yeh function kuch nahi karega
//         if (matchedHall == null) {
//             return null; // Fallback to KnowledgeService
//         }

//         // Intent 2: Us khaas hall ke baare mein sawaalon ka jawaab dein
//         if (query.contains("budget") || query.contains("price") || query.contains("cost")) {
//             return matchedHall.getName() + "'s price per day is ₹" + matchedHall.getPricePerDay() + ".";
//         }
//         if (query.contains("location") || query.contains("where is it")) {
//             return matchedHall.getName() + " is located in " + matchedHall.getLocation() + ".";
//         }
//         if (query.contains("capacity") || query.contains("how many guests")) {
//             return matchedHall.getName() + " can hold up to " + matchedHall.getCapacity() + " guests.";
//         }
//         if (query.contains("food") || query.contains("catering")) {
//             return matchedHall.getName() + " offers " + matchedHall.getFoodType() + " catering.";
//         }
//         if (query.contains("type") || query.contains("event")) {
//             return matchedHall.getName() + " is best suited for " + matchedHall.getEventType() + " events.";
//         }

//         // Fallback: Agar hall match hua par sawaal samajh nahi aaya
//         return "What would you like to know about " + matchedHall.getName() + "? You can ask about its budget, location, capacity, or food type.";
//     }

//     // =================================================================
//     // 💥 प्लानर के सवालों का जवाब देने वाला हेल्पर
//     // (Ismein koi badlaav nahi hai)
//     // =================================================================
//     private String answerPlannerQuery(String query, List<Planner> allPlanners) {
        
//         // इंटेंट 0a: "planner with price range"
//         Map<String, Double> priceRange = extractPriceRange(query);
//         if (!priceRange.isEmpty() && !hasSpecificName(query, allPlanners.stream().map(Planner::getName).collect(Collectors.toList()))) {
//             List<Planner> filtered = allPlanners.stream()
//                 .filter(p -> ((priceRange.get("min") == null || p.getStartingPrice() >= priceRange.get("min")) &&
//                               (priceRange.get("max") == null || p.getStartingPrice() <= priceRange.get("max"))))
//                 .collect(Collectors.toList());
//             if (filtered.isEmpty()) return "Sorry, I couldn't find any planners in that price range.";
//             String names = filtered.stream().map(p -> p.getName() + " (₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
//             return "Here are the planners I found in that price range:\n• " + names;
//         }

//         // इंटेंट 0b: "which planner is available on [date]"
//         // if ((query.contains("which planner") || query.contains("any planner") || query.contains("planners available")) && query.contains("available")) {
//             // 🔽 ISE ISSE BADAL DEIN (Naya code)
//     if ((query.contains("which planner") || query.contains("any planner") || query.contains("planners available") || query.contains("planner available")) && query.contains("available")) {
    
//             LocalDate date = extractDate(query);
//             if (date == null) return "Sure, I can check planner availability. For which date? (YYYY-MM-DD)";
//             List<Planner> available = plannerBookingService.getAvailablePlanners(date);
//             if (available.isEmpty()) return "Sorry, no planners are available for booking on " + date + ".";
//             String names = available.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
//             return "Here are the planners available on " + date + ":\n• " + names;
//         }
        
//         // इंटेंट 0c: "planner with specialization in [topic]"
//         if ((query.contains("specializes in") || query.contains("specialization")) && !hasSpecificName(query, allPlanners.stream().map(Planner::getName).collect(Collectors.toList()))) {
//             String topic = extractTopic(query);
//             if (topic.isEmpty()) return "Which specialization are you looking for? (e.g., weddings, corporate events)";
//             List<Planner> filtered = allPlanners.stream()
//                 .filter(p -> p.getSpecialization() != null && p.getSpecialization().toLowerCase().contains(topic))
//                 .collect(Collectors.toList());
//             if (filtered.isEmpty()) return "Sorry, I couldn't find any planners who specialize in '" + topic + "'.";
//             String names = filtered.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
//             return "Here are the planners who specialize in " + topic + ":\n• " + names;
//         }

//         // इंटेंट 0d: "list of planners"
//         //if (query.contains("list of planner") || query.contains("show me planner") || query.contains("all planner") || query.contains("who are the planner") || query.contains("name of planner")) {
//         if (query.contains("list of planner") || query.contains("list planner") || query.contains("show me planner") || query.contains("all planner") || query.contains("who are the planner") || query.contains("name of planner")) {
       
//             if (allPlanners.isEmpty()) return "I don't have a list of planners at the moment.";
//             if (query.contains("price") || query.contains("cost")) {
//                 String names = allPlanners.stream().map(p -> p.getName() + " (starts at ₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
//                 return "Here are the planners and their starting prices:\n• " + names;
//             }
//             String names = allPlanners.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
//             return "Here are the planners I can help with:\n• " + names;
//         }

//         // इंटेंट 1: किसी एक खास प्लानर का नाम ढूँढें
//         Planner matchedPlanner = null;
//         for (Planner planner : allPlanners) { 
//             String firstName = planner.getName().split(" ")[0].toLowerCase().trim();
//             if (query.contains(firstName) && !firstName.isEmpty()) {
//                 matchedPlanner = planner;
//                 break;
//             }
//         }
//         if (matchedPlanner == null) return null; // Fallback to KnowledgeService

//         // इंटेंट 2: किसी एक खास प्लानर के बारे में सवाल
//         if (query.contains("price")) return matchedPlanner.getName() + "'s starting price is ₹" + matchedPlanner.getStartingPrice() + ".";
//         if (query.contains("specialization")) return matchedPlanner.getName() + " specializes in: " + matchedPlanner.getSpecialization() + ".";
//         if (query.contains("rating")) return matchedPlanner.getName() + " has a rating of " + matchedPlanner.getRating() + " stars.";
//         if (query.contains("available")) {
//             LocalDate date = extractDate(query);
//             if (date == null) return "Sure, for which date are you asking about " + matchedPlanner.getName() + "? (YYYY-MM-DD)";
//             boolean isAvailable = plannerBookingService.isPlannerAvailable(matchedPlanner.getPlannerId(), date);
//             return isAvailable ? "Yes, " + matchedPlanner.getName() + " is available for booking on " + date + "."
//                                : "Sorry, " + matchedPlanner.getName() + " is already booked on " + date + ".";
//         }
//         return "What would you like to know about " + matchedPlanner.getName() + "? You can ask about price, rating, specialization, or availability.";
//     }

//     // =================================================================
//     // 💥 फोटोग्राफर के सवालों का जवाब देने वाला नया हेल्पर
//     // (Ismein koi badlaav nahi hai)
//     // =================================================================
//     private String answerPhotographerQuery(String query, List<Photographer> allPhotographers) {
        
//         // इंटेंट 0a: "photographer with price range"
//         Map<String, Double> priceRange = extractPriceRange(query);
//         if (!priceRange.isEmpty() && !hasSpecificName(query, allPhotographers.stream().map(Photographer::getName).collect(Collectors.toList()))) {
//             List<Photographer> filtered = allPhotographers.stream()
//                 .filter(p -> ((priceRange.get("min") == null || p.getStartingPrice() >= priceRange.get("min")) &&
//                               (priceRange.get("max") == null || p.getStartingPrice() <= priceRange.get("max"))))
//                 .collect(Collectors.toList());
//             if (filtered.isEmpty()) return "Sorry, I couldn't find any photographers in that price range.";
//             String names = filtered.stream().map(p -> p.getName() + " (₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
//             return "Here are the photographers I found in that price range:\n• " + names;
//         }

//         // इंटेंट 0b: "which photographer is available on [date]"
//         //if ((query.contains("which photographer") || query.contains("any photographer") || query.contains("photographers available")) && query.contains("available")) {
//                if ((query.contains("which photographer") || query.contains("any photographer") || query.contains("photographers available") || query.contains("photographer available")) && query.contains("available")) {
    
//         LocalDate date = extractDate(query);
//             if (date == null) return "Sure, I can check photographer availability. For which date? (YYYY-MM-DD)";
//             List<Photographer> available = photographerBookingService.getAvailablePhotographers(date);
//             if (available.isEmpty()) return "Sorry, no photographers are available for booking on " + date + ".";
//             String names = available.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
//             return "Here are the photographers available on " + date + ":\n• " + names;
//         }
        
//         // इंटेंट 0c: "photographer with specialization in [topic]"
//         if ((query.contains("specializes in") || query.contains("specialization")) && !hasSpecificName(query, allPhotographers.stream().map(Photographer::getName).collect(Collectors.toList()))) {
//             String topic = extractTopic(query);
//             if (topic.isEmpty()) return "Which specialization are you looking for? (e.g., weddings, corporate)";
//             List<Photographer> filtered = allPhotographers.stream()
//                 .filter(p -> p.getSpecialization() != null && p.getSpecialization().toLowerCase().contains(topic))
//                 .collect(Collectors.toList());
//             if (filtered.isEmpty()) return "Sorry, I couldn't find any photographers who specialize in '" + topic + "'.";
//             String names = filtered.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
//             return "Here are the photographers who specialize in " + topic + ":\n• " + names;
//         }

//         // इंटेंट 0d: "list of photographers"
//         //if (query.contains("list of photographer") || query.contains("show me photographer") || query.contains("all photographer") || query.contains("who are the photographer") || query.contains("name of photographer")) {
//            if (query.contains("list of photographer") || query.contains("list photographer") || query.contains("show me photographer") || query.contains("all photographer") || query.contains("who are the photographer") || query.contains("name of photographer")) {
       
//         if (allPhotographers.isEmpty()) return "I don't have a list of photographers at the moment.";
//             if (query.contains("price") || query.contains("cost")) {
//                 String names = allPhotographers.stream().map(p -> p.getName() + " (starts at ₹" + p.getStartingPrice() + ")").collect(Collectors.joining("\n• "));
//                 return "Here are the photographers and their starting prices:\n• " + names;
//             }
//             String names = allPhotographers.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
//             return "Here are the photographers I can help with:\n• " + names;
//         }

//         // इंटेंट 1: किसी एक खास फोटोग्राफर का नाम ढूँढें
//         Photographer matchedPhotographer = null;
//         for (Photographer p : allPhotographers) { 
//             String firstName = p.getName().split(" ")[0].toLowerCase().trim(); // "Riya", "Rajesh", "Chandan", "Aashutosh"
//             if (query.contains(firstName) && !firstName.isEmpty()) {
//                 matchedPhotographer = p;
//                 break;
//             }
//         }
//         if (matchedPhotographer == null) return null; // Fallback

//         // इंटेंट 2: किसी एक खास फोटोग्राफर के बारे में सवाल
//         if (query.contains("price")) return matchedPhotographer.getName() + "'s starting price is ₹" + matchedPhotographer.getStartingPrice() + ".";
//         if (query.contains("specialization")) return matchedPhotographer.getName() + " specializes in: " + matchedPhotographer.getSpecialization() + ".";
//         if (query.contains("rating")) return matchedPhotographer.getName() + " has a rating of " + matchedPhotographer.getRating() + " stars.";
//         if (query.contains("available")) {
//             LocalDate date = extractDate(query);
//             if (date == null) return "Sure, for which date are you asking about " + matchedPhotographer.getName() + "? (YYYY-MM-DD)";
//             boolean isAvailable = photographerBookingService.isPhotographerAvailable(matchedPhotographer.getPhotographerId(), date);
//             return isAvailable ? "Yes, " + matchedPhotographer.getName() + " is available for booking on " + date + "."
//                                : "Sorry, " + matchedPhotographer.getName() + " is already booked on " + date + ".";
//         }
//         return "What would you like to know about " + matchedPhotographer.getName() + "? You can ask about price, rating, specialization, or availability.";
//     }


//     // =================================================================
//     // 💥 सामान्य हेल्पर मेथड्स
//     // (Inmein koi badlaav nahi hai)
//     // =================================================================

//     // हेल्पर: जाँचता है कि क्या सवाल में कोई खास नाम है
//     private boolean hasSpecificName(String query, List<String> names) {
//         for (String name : names) { 
//             String firstName = name.split(" ")[0].toLowerCase().trim();
//             if (query.contains(firstName) && !firstName.isEmpty()) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     // हेल्पर: specialization टॉपिक निकालता है
//     private String extractTopic(String query) {
//         if (query.contains("wedding")) return "wedding";
//         if (query.contains("corporate")) return "corporate";
//         if (query.contains("bday") || query.contains("birthday")) return "bday";
//         if (query.contains("engagement")) return "engagement";
//         if (query.contains("destination")) return "destination";
//         if (query.contains("portrait")) return "portrait";
//         return "";
//     }

//     // हेल्पर: कीमत की रेंज निकालता है
//     private Map<String, Double> extractPriceRange(String query) {
//         Map<String, Double> range = new HashMap<>();
//         Pattern p; Matcher m;

//         p = Pattern.compile("between (\\d+) and (\\d+)"); m = p.matcher(query);
//         if (m.find()) { range.put("min", Double.parseDouble(m.group(1))); range.put("max", Double.parseDouble(m.group(2))); return range; }
        
//         p = Pattern.compile("(\\d+)-(\\d+)"); m = p.matcher(query);
//         if (m.find()) { range.put("min", Double.parseDouble(m.group(1))); range.put("max", Double.parseDouble(m.group(2))); return range; }

//         p = Pattern.compile("(under|less than|max) (\\d+)"); m = p.matcher(query);
//         if (m.find()) { range.put("max", Double.parseDouble(m.group(2))); return range; }

//         p = Pattern.compile("(over|more than|min) (\\d+)"); m = p.matcher(query);
//         if (m.find()) { range.put("min", Double.parseDouble(m.group(1))); return range; }
        
//         return range;
//     }
    
//     // हेल्पर: तारीख निकालता है
//     private LocalDate extractDate(String query) {
//         Pattern p; Matcher m;

//         p = Pattern.compile("(\\d{4}-\\d{2}-\\d{2})"); m = p.matcher(query);
//         if (m.find()) { try { return LocalDate.parse(m.group(1)); } catch (DateTimeParseException e) {} }

//         p = Pattern.compile("(\\d{1,2})[th|st|rd|nd]* (\\w+)(?: (\\d{4}))?"); m = p.matcher(query);
//         if (m.find()) {
//             try {
//                 int day = Integer.parseInt(m.group(1));
//                 String monthName = m.group(2);
//                 int year = (m.group(3) != null) ? Integer.parseInt(m.group(3)) : LocalDate.now().getYear(); 
//                 Month month = Month.valueOf(monthName.toUpperCase());
//                 return LocalDate.of(year, month, day);
//             } catch (Exception e) {}
//         }
//         return null;
//     }// ... (aapka extractDate method yahan khatm hota hai)

//     // 🔽 YEH NAYA HELPER METHOD ADD KAREIN 🔽
//     /**
//      * Query se specialization topic (jaise "wedding") nikaalta hai.
//      */
    
// } // <-- Yeh ChatController class ka closing bracket hai



