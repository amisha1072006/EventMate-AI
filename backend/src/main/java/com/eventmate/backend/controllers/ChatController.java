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

import com.eventmate.backend.models.Photographer;
import com.eventmate.backend.models.Planner;
import com.eventmate.backend.repositories.PhotographerRepository;
import com.eventmate.backend.repositories.PlannerRepository;
import com.eventmate.backend.service.PhotographerBookingService;
import com.eventmate.backend.service.PlannerBookingService;
import com.eventmate.backend.service.ProjectKnowledgeService;

@RestController
@RequestMapping("/api/bot")
public class ChatController {

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
                          PlannerRepository plannerRepository,
                          PlannerBookingService plannerBookingService,
                          PhotographerRepository photographerRepository, // 💥 नया
                          PhotographerBookingService photographerBookingService // 💥 नया
                          ) {
        this.knowledgeService = knowledgeService;
        this.plannerRepository = plannerRepository;
        this.plannerBookingService = plannerBookingService;
        this.photographerRepository = photographerRepository;
        this.photographerBookingService = photographerBookingService;
        
        System.out.println("--- [DEBUG] EventMate Bot Initialized (V9 - Planners & Photographers) ---");
    }

    @PostMapping("/ask")
    public Map<String, String> askBot(@RequestBody Map<String, String> request) {
        String query = request.get("query").toLowerCase().trim();
        String answer;

        // 💥 इसे 'handleSmartQuery' नाम दिया गया है
        String smartAnswer = handleSmartQuery(query); 

        if (smartAnswer != null) {
            answer = smartAnswer;
        } else {
            answer = knowledgeService.getAnswer(query);
            
            if (answer != null && (answer.toLowerCase().contains("i can mainly help with finding venues") || answer.toLowerCase().contains("no specific information"))) {
                 answer = "I'm not sure how to answer that, but I can help with planners, photographers, or project files.";
            }
        }
        
        Map<String, String> response = new HashMap<>();
        response.put("answer", answer);
        return response;
    }

    // =================================================================
    // 💥 यह मुख्य 'ब्रेन' है जो प्लानर/फोटोग्राफर के सवालों को रूट करता है
    // =================================================================
    private String handleSmartQuery(String query) {
        
        // 1. जाँचें कि क्या यह फोटोग्राफर का सवाल है
        if (query.contains("photographer") || query.contains("riya") || query.contains("rajesh") || query.contains("chandan") || query.contains("aashutosh")) {
            System.out.println("[DEBUG] Routing to Photographer Logic...");
            // 💥 फिक्स: हर बार ताजा डेटा लाएँ
            List<Photographer> allPhotographers = this.photographerRepository.findAll();
            return answerPhotographerQuery(query, allPhotographers);
        }

        // 2. जाँचें कि क्या यह प्लानर का सवाल है
        if (query.contains("planner") || query.contains("priya") || query.contains("himanshu") || query.contains("aakash")) {
            System.out.println("[DEBUG] Routing to Planner Logic...");
            // 💥 फिक्स: हर बार ताजा डेटा लाएँ
            List<Planner> allPlanners = this.plannerRepository.findAll();
            return answerPlannerQuery(query, allPlanners);
        }

        // 3. अगर दोनों नहीं हैं, तो Fallback
        return null;
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

        // इंटेंट 0b: "which planner is available on [date]"
        if ((query.contains("which planner") || query.contains("any planner") || query.contains("planners available")) && query.contains("available")) {
            LocalDate date = extractDate(query);
            if (date == null) return "Sure, I can check planner availability. For which date? (YYYY-MM-DD)";
            List<Planner> available = plannerBookingService.getAvailablePlanners(date);
            if (available.isEmpty()) return "Sorry, no planners are available for booking on " + date + ".";
            String names = available.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
            return "Here are the planners available on " + date + ":\n• " + names;
        }
        
        // इंटेंट 0c: "planner with specialization in [topic]"
        if ((query.contains("specializes in") || query.contains("specialization")) && !hasSpecificName(query, allPlanners.stream().map(Planner::getName).collect(Collectors.toList()))) {
            String topic = extractTopic(query);
            if (topic.isEmpty()) return "Which specialization are you looking for? (e.g., weddings, corporate events)";
            List<Planner> filtered = allPlanners.stream()
                .filter(p -> p.getSpecialization() != null && p.getSpecialization().toLowerCase().contains(topic))
                .collect(Collectors.toList());
            if (filtered.isEmpty()) return "Sorry, I couldn't find any planners who specialize in '" + topic + "'.";
            String names = filtered.stream().map(Planner::getName).collect(Collectors.joining("\n• "));
            return "Here are the planners who specialize in " + topic + ":\n• " + names;
        }

        // इंटेंट 0d: "list of planners"
        if (query.contains("list of planner") || query.contains("show me planner") || query.contains("all planner") || query.contains("who are the planner") || query.contains("name of planner")) {
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
    // 💥 फोटोग्राफर के सवालों का जवाब देने वाला नया हेल्पर
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

        // इंटेंट 0b: "which photographer is available on [date]"
        if ((query.contains("which photographer") || query.contains("any photographer") || query.contains("photographers available")) && query.contains("available")) {
            LocalDate date = extractDate(query);
            if (date == null) return "Sure, I can check photographer availability. For which date? (YYYY-MM-DD)";
            List<Photographer> available = photographerBookingService.getAvailablePhotographers(date);
            if (available.isEmpty()) return "Sorry, no photographers are available for booking on " + date + ".";
            String names = available.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
            return "Here are the photographers available on " + date + ":\n• " + names;
        }
        
        // इंटेंट 0c: "photographer with specialization in [topic]"
        if ((query.contains("specializes in") || query.contains("specialization")) && !hasSpecificName(query, allPhotographers.stream().map(Photographer::getName).collect(Collectors.toList()))) {
            String topic = extractTopic(query);
            if (topic.isEmpty()) return "Which specialization are you looking for? (e.g., weddings, corporate)";
            List<Photographer> filtered = allPhotographers.stream()
                .filter(p -> p.getSpecialization() != null && p.getSpecialization().toLowerCase().contains(topic))
                .collect(Collectors.toList());
            if (filtered.isEmpty()) return "Sorry, I couldn't find any photographers who specialize in '" + topic + "'.";
            String names = filtered.stream().map(Photographer::getName).collect(Collectors.joining("\n• "));
            return "Here are the photographers who specialize in " + topic + ":\n• " + names;
        }

        // इंटेंट 0d: "list of photographers"
        if (query.contains("list of photographer") || query.contains("show me photographer") || query.contains("all photographer") || query.contains("who are the photographer") || query.contains("name of photographer")) {
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
    // 💥 सामान्य हेल्पर मेथड्स
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

    // हेल्पर: specialization टॉपिक निकालता है
    private String extractTopic(String query) {
        if (query.contains("wedding")) return "wedding";
        if (query.contains("corporate")) return "corporate";
        if (query.contains("bday") || query.contains("birthday")) return "bday";
        if (query.contains("engagement")) return "engagement";
        if (query.contains("destination")) return "destination";
        if (query.contains("portrait")) return "portrait";
        return "";
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
}

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

// import com.eventmate.backend.models.Planner; 
// import com.eventmate.backend.repositories.PlannerRepository;
// import com.eventmate.backend.service.PlannerBookingService;
// import com.eventmate.backend.service.ProjectKnowledgeService;

// @RestController
// @RequestMapping("/api/bot")
// public class ChatController {

//     private final PlannerRepository plannerRepository;
//     private final PlannerBookingService plannerBookingService;
//     private final ProjectKnowledgeService knowledgeService;

//     @Autowired
//     public ChatController(ProjectKnowledgeService knowledgeService,
//                           PlannerRepository plannerRepository,
//                           PlannerBookingService plannerBookingService) {
//         this.knowledgeService = knowledgeService;
//         this.plannerRepository = plannerRepository;
//         this.plannerBookingService = plannerBookingService;
        
//         System.out.println("--- [DEBUG] EventMate Bot Initialized (V8.1 - Syntax Fix) ---");
//     }

//     @PostMapping("/ask")
//     public Map<String, String> askBot(@RequestBody Map<String, String> request) {
//         String query = request.get("query").toLowerCase().trim();
//         String answer;

//         String plannerAnswer = handlePlannerQuery(query); 

//         if (plannerAnswer != null) {
//             answer = plannerAnswer;
//         } else {
//             answer = knowledgeService.getAnswer(query);
            
//             if (answer != null && (answer.toLowerCase().contains("i can mainly help with finding venues") || answer.toLowerCase().contains("no specific information"))) {
//                  answer = "I'm not sure how to answer that, but I can help with planners. Try asking 'what is priya singh price?' or 'show me all planners'.";
//             }
//         }
        
//         Map<String, String> response = new HashMap<>();
//         response.put("answer", answer);
//         return response;
//     }

//     // हेल्पर: जाँचता है कि क्या सवाल में कोई खास नाम है
//     private boolean hasSpecificPlannerName(String query, List<Planner> allPlanners) {
//         for (Planner planner : allPlanners) { 
//             String firstName = planner.getName().split(" ")[0].toLowerCase().trim();
//             if (query.contains(firstName) && !firstName.isEmpty()) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     // हेल्पर: कीमत की रेंज निकालता है
//     private Map<String, Double> extractPriceRange(String query) {
//         Map<String, Double> range = new HashMap<>();
        
//         // 1. "between 10000 and 25000"
//         // 💥 फिक्स: \d को \\d किया
//         Pattern rangePattern = Pattern.compile("between (\\d+) and (\\d+)");
//         Matcher rangeMatcher = rangePattern.matcher(query);
//         if (rangeMatcher.find()) {
//             range.put("min", Double.parseDouble(rangeMatcher.group(1)));
//             range.put("max", Double.parseDouble(rangeMatcher.group(2)));
//             return range;
//         }

//         // 2. "10000-25000"
//         // 💥 फिक्स: \d को \\d किया
//         Pattern dashPattern = Pattern.compile("(\\d+)-(\\d+)");
//         Matcher dashMatcher = dashPattern.matcher(query);
//         if (dashMatcher.find()) {
//             range.put("min", Double.parseDouble(dashMatcher.group(1)));
//             range.put("max", Double.parseDouble(dashMatcher.group(2)));
//             return range;
//         }

//         // 3. "under 25000"
//         // 💥 फिक्स: \d को \\d किया
//         Pattern underPattern = Pattern.compile("(under|less than|max) (\\d+)");
//         Matcher underMatcher = underPattern.matcher(query);
//         if (underMatcher.find()) {
//             range.put("max", Double.parseDouble(underMatcher.group(2)));
//             return range;
//         }

//         // 4. "over 10000"
//         // 💥 फिक्स: \d को \\d किया
//         Pattern overPattern = Pattern.compile("(over|more than|min) (\\d+)");
//         Matcher overMatcher = overPattern.matcher(query);
//         if (overMatcher.find()) {
//             range.put("min", Double.parseDouble(overMatcher.group(1)));
//             return range;
//         }
        
//         return range;
//     }


//     private String handlePlannerQuery(String query) {
        
//         List<Planner> allPlanners = this.plannerRepository.findAll();
//         System.out.println("[DEBUG] Fetched " + allPlanners.size() + " planners from DB for query: '" + query + "'");

//         // इंटेंट 0a: "planner with price range"
//         Map<String, Double> priceRange = extractPriceRange(query);
//         if (!priceRange.isEmpty() && (query.contains("planner") || query.contains("planners")) && !hasSpecificPlannerName(query, allPlanners)) {
            
//             Double minPrice = priceRange.get("min");
//             Double maxPrice = priceRange.get("max");

//             List<Planner> filteredPlanners = allPlanners.stream()
//                 .filter(planner -> {
//                     boolean passMin = (minPrice == null) || (planner.getStartingPrice() >= minPrice);
//                     boolean passMax = (maxPrice == null) || (planner.getStartingPrice() <= maxPrice);
//                     return passMin && passMax;
//                 })
//                 .collect(Collectors.toList());
            
//             if (filteredPlanners.isEmpty()) {
//                 return "Sorry, I couldn't find any planners in that price range.";
//             }

//             String plannerPrices = filteredPlanners.stream()
//                 .map(p -> p.getName() + " (₹" + p.getStartingPrice() + ")")
//                 .collect(Collectors.joining("\n• "));
//             return "Here are the planners I found in that price range:\n• " + plannerPrices;
//         }

//         // इंटेंट 0b: "which planner is available on [date]"
//         if ((query.contains("which planner") || query.contains("any planner") || query.contains("planners available")) && query.contains("available")) {
            
//             LocalDate date = extractDate(query);
//             if (date == null) {
//                 return "Sure, I can check planner availability. For which date? (Please use YYYY-MM-DD format)";
//             }
            
//             List<Planner> availablePlanners = plannerBookingService.getAvailablePlanners(date);
            
//             if (availablePlanners.isEmpty()) {
//                 return "Sorry, no planners are available for booking on " + date + ".";
//             }
            
//             String plannerNames = availablePlanners.stream()
//                                     .map(Planner::getName)
//                                     .collect(Collectors.joining("\n• "));
//             return "Here are the planners available on " + date + ":\n• " + plannerNames;
//         }
        
//         // इंटेंट 0c: "planner with specialization in [topic]"
//         if ((query.contains("specializes in") || query.contains("specialization")) && !hasSpecificPlannerName(query, allPlanners)) {
            
//             String specializationTopic = "";
//             if (query.contains("wedding")) specializationTopic = "wedding";
//             else if (query.contains("corporate")) specializationTopic = "corporate";
//             else if (query.contains("bday") || query.contains("birthday")) specializationTopic = "bday";
//             else if (query.contains("engagement")) specializationTopic = "engagement";
//             else if (query.contains("destination")) specializationTopic = "destination";

//             if (specializationTopic.isEmpty()) {
//                 return "Which specialization are you looking for? (e.g., weddings, corporate events)";
//             }

//             final String topic = specializationTopic; 
//             List<Planner> specializedPlanners = allPlanners.stream()
//                 .filter(planner -> planner.getSpecialization() != null && planner.getSpecialization().toLowerCase().contains(topic))
//                 .collect(Collectors.toList());
            
//             if (specializedPlanners.isEmpty()) {
//                 return "Sorry, I couldn't find any planners who specialize in '" + topic + "'.";
//             }

//             String plannerNames = specializedPlanners.stream()
//                 .map(Planner::getName)
//                 .collect(Collectors.joining("\n• "));
//             return "Here are the planners who specialize in " + topic + ":\n• " + plannerNames;
//         }


//         // इंटेंट 0d: "list of planners"
//         if (query.contains("list of planner") || query.contains("show me planner") || query.contains("all planner") || query.contains("who are the planner") || query.contains("name of planner")) {
//             if (allPlanners.isEmpty()) {
//                 return "I don't have a list of planners at the moment.";
//             }

//             if (query.contains("price") || query.contains("cost")) {
//                 String plannerPrices = allPlanners.stream()
//                     .map(planner -> planner.getName() + " (starts at ₹" + planner.getStartingPrice() + ")")
//                     .collect(Collectors.joining("\n• "));
//                 return "Here are the planners and their starting prices:\n• " + plannerPrices;
//             }
            
//             String plannerNames = allPlanners.stream()
//                                     .map(Planner::getName)
//                                     .collect(Collectors.joining("\n• ")); 
//             return "Here are the planners I can help with:\n• " + plannerNames;
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

//         if (matchedPlanner == null) {
//             System.out.println("[DEBUG] No specific planner name found in query.");
//             return null; // 'knowledgeService' का इस्तेमाल करो
//         }

//         System.out.println("[DEBUG] Matched planner (using first name): " + matchedPlanner.getName());

//         // इंटेंट 2: किसी एक खास प्लानर के बारे में सवाल
        
//         if (query.contains("price") || query.contains("cost") || query.contains("how much") || query.contains("kitne")) {
//             return matchedPlanner.getName() + "'s starting price is ₹" + matchedPlanner.getStartingPrice() + ".";
//         }

//         if (query.contains("specialization") || query.contains("specializes in") || query.contains("what does") || query.contains("type of event")) {
//             return matchedPlanner.getName() + " specializes in: " + matchedPlanner.getSpecialization() + ".";
//         }

//         if (query.contains("rating") || query.contains("how good")) {
//             return matchedPlanner.getName() + " has a rating of " + matchedPlanner.getRating() + " stars.";
//         }

//         if (query.contains("available") || query.contains("booking") || query.contains("free")) {
//             LocalDate date = extractDate(query);
//             if (date == null) {
//                 return "Sure, for which date are you asking about " + matchedPlanner.getName() + "? (Please use format like '10 november 2025' or '2025-11-10')";
//             }
            
//             boolean isAvailable = plannerBookingService.isPlannerAvailable(matchedPlanner.getPlannerId(), date);
            
//             if (isAvailable) {
//                 return "Yes, " + matchedPlanner.getName() + " is available for booking on " + date + ".";
//             } else {
//                 return "Sorry, " + matchedPlanner.getName() + " is already booked on " + date + ".";
//             }
//         }
        
//         return "What would you like to know about " + matchedPlanner.getName() + "? You can ask about price, rating, specialization, or availability.";
//     }

//     // 💥 ----- यहाँ है असली फिक्स ----- 💥
//     private LocalDate extractDate(String query) {
//         // Pattern 1: YYYY-MM-DD
//         // 💥 फिक्स: \d को \\d किया
//         Pattern ymdPattern = Pattern.compile("(\\d{4}-\\d{2}-\\d{2})");
//         Matcher ymdMatcher = ymdPattern.matcher(query);
//         if (ymdMatcher.find()) {
//             try {
//                 return LocalDate.parse(ymdMatcher.group(1));
//             } catch (DateTimeParseException e) { /* ignore */ }
//         }

//         // Pattern 2: "10 november 2025" या "10 november"
//         // 💥 फिक्स: \d और \w को \\d और \\w किया
//         Pattern dmyPattern = Pattern.compile("(\\d{1,2})[th|st|rd|nd]* (\\w+)(?: (\\d{4}))?");
//         Matcher dmyMatcher = dmyPattern.matcher(query);
        
//         if (dmyMatcher.find()) {
//             try {
//                 int day = Integer.parseInt(dmyMatcher.group(1));
//                 String monthName = dmyMatcher.group(2);
//                 int year = (dmyMatcher.group(3) != null) ? Integer.parseInt(dmyMatcher.group(3)) : LocalDate.now().getYear(); 
//                 Month month = Month.valueOf(monthName.toUpperCase());
//                 return LocalDate.of(year, month, day);
//             } catch (Exception e) { /* ignore */ }
//         }
//         return null;
//     }
// }




// package com.eventmate.backend.controllers;

// import com.eventmate.backend.models.Planner;
// import com.eventmate.backend.repositories.PlannerRepository;
// import com.eventmate.backend.service.PlannerBookingService;
// import com.eventmate.backend.service.ProjectKnowledgeService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.time.LocalDate;
// import java.time.Month;
// import java.time.format.DateTimeParseException;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.regex.Matcher;
// import java.util.regex.Pattern;

// @RestController
// @RequestMapping("/api/bot")
// public class ChatController {

//     private final PlannerRepository plannerRepository;
//     private final PlannerBookingService plannerBookingService;
//     private final ProjectKnowledgeService knowledgeService;
//     private List<Planner> allPlanners;

//     @Autowired
//     public ChatController(ProjectKnowledgeService knowledgeService,
//                           PlannerRepository plannerRepository,
//                           PlannerBookingService plannerBookingService) {
//         this.knowledgeService = knowledgeService;
//         this.plannerRepository = plannerRepository;
//         this.plannerBookingService = plannerBookingService;
        
//         this.allPlanners = this.plannerRepository.findAll(); 

//         // ----- DEBUGGING ----- 
//         System.out.println("--- [DEBUG] EventMate Bot Initialized (V3) ---");
//         System.out.println("Loaded " + this.allPlanners.size() + " planners from database:");
//         for (Planner p : this.allPlanners) {
//             System.out.println("- Found Planner: '" + p.getName() + "'");
//         }
//         if (this.allPlanners.isEmpty()) {
//             System.out.println("[WARNING] No planners found. Name matching will fail.");
//         }
//         System.out.println("-----------------------------------------");
//         // ----- END DEBUGGING ----- 
//     }

//     @PostMapping("/ask")
//     public Map<String, String> askBot(@RequestBody Map<String, String> request) {
//         String query = request.get("query").toLowerCase().trim();
//         String answer;

//         // 1. 🧠 प्लानर से जुड़े सवालों को पहचानने की कोशिश करें
//         String plannerAnswer = handlePlannerQuery(query);

//         if (plannerAnswer != null) {
//             answer = plannerAnswer;
//         } else {
//             // 2. 🧠 अगर प्लानर का सवाल नहीं है, तो पुरानी नॉलेज सर्विस का इस्तेमाल करें
//             answer = knowledgeService.getAnswer(query);
            
//             // 💥 [FIX] यह हमारा बदला हुआ मैसेज है
//             if (answer != null && answer.toLowerCase().contains("i can mainly help with finding venues")) {
//                  answer = "I'm not sure how to answer that, but I can help with planners. Try asking 'what is priya singh price?' or 'is rajesh kumar available?'.";
//             }
//         }
        
//         Map<String, String> response = new HashMap<>();
//         response.put("answer", answer);
//         return response;
//     }

//     private String handlePlannerQuery(String query) {
        
//         Planner matchedPlanner = null;
//         for (Planner planner : this.allPlanners) {
            
//             // 💥 ----- हम "पहले नाम" (First Name) से मैच कर रहे हैं ----- 💥
//             String firstName = planner.getName().split(" ")[0].toLowerCase().trim();
            
//             if (query.contains(firstName) && !firstName.isEmpty()) {
//                 matchedPlanner = planner;
//                 break;
//             }
//         }

//         if (matchedPlanner == null) {
//             System.out.println("[DEBUG] No planner name found in query: '" + query + "'");
//             return null; // <-- 'null' का मतलब है कि 'knowledgeService' का इस्तेमाल करो
//         }

//         System.out.println("[DEBUG] Matched planner (using first name): " + matchedPlanner.getName());

//         // 2. 'इरादा' (Intent) पहचानें
        
//         // --- Intent 1: कीमत (Price) ---
//         // (इसे उपलब्धता से पहले चेक करें)
//         if (query.contains("price") || query.contains("cost") || query.contains("how much") || query.contains("kitne")) {
//             return matchedPlanner.getName() + "'s starting price is ₹" + matchedPlanner.getStartingPrice() + ".";
//         }

//         // --- Intent 2: विशेषज्ञता (Specialization) ---
//         if (query.contains("specialization") || query.contains("specializes in") || query.contains("what does") || query.contains("type of event")) {
//             return matchedPlanner.getName() + " specializes in: " + matchedPlanner.getSpecialization() + ".";
//         }

//         // --- Intent 3: रेटिंग (Rating) ---
//         if (query.contains("rating") || query.contains("how good")) {
//             return matchedPlanner.getName() + " has a rating of " + matchedPlanner.getRating() + " stars.";
//         }

//         // --- Intent 4: उपलब्धता (Availability) ---
//         if (query.contains("available") || query.contains("booking") || query.contains("free")) {
//             LocalDate date = extractDate(query);
//             if (date == null) {
//                 return "Sure, for which date are you asking about " + matchedPlanner.getName() + "? (Please use format like '10 november 2025' or '2025-11-10')";
//             }
            
//             boolean isAvailable = plannerBookingService.isPlannerAvailable(matchedPlanner.getPlannerId(), date);
            
//             if (isAvailable) {
//                 return "Yes, " + matchedPlanner.getName() + " is available for booking on " + date + ".";
//             } else {
//                 return "Sorry, " + matchedPlanner.getName() + " is already booked on " + date + ".";
//             }
//         }
        
//         // --- Fallback (सिर्फ नाम लिया, लेकिन इरादा स्पष्ट नहीं) ---
//         return "What would you like to know about " + matchedPlanner.getName() + "? You can ask about price, rating, specialization, or availability.";
//     }

//     // ... (extractDate मेथड जैसा पहले था वैसा ही रहेगा) ...
//     private LocalDate extractDate(String query) {
//         // Pattern 1: YYYY-MM-DD (e.g., 2025-11-10)
//         Pattern ymdPattern = Pattern.compile("(\\d{4}-\\d{2}-\\d{2})");
//         Matcher ymdMatcher = ymdPattern.matcher(query);
//         if (ymdMatcher.find()) {
//             try {
//                 return LocalDate.parse(ymdMatcher.group(1));
//             } catch (DateTimeParseException e) { /* ignore */ }
//         }

//         // Pattern 2: "10 november 2025" या "10 november"
//         Pattern dmyPattern = Pattern.compile("(\\d{1,2})[th|st|rd|nd]* (\\w+)(?: (\\d{4}))?");
//         Matcher dmyMatcher = dmyPattern.matcher(query);
        
//         if (dmyMatcher.find()) {
//             try {
//                 int day = Integer.parseInt(dmyMatcher.group(1));
//                 String monthName = dmyMatcher.group(2);
//                 int year = (dmyMatcher.group(3) != null) ? Integer.parseInt(dmyMatcher.group(3)) : LocalDate.now().getYear(); 
//                 Month month = Month.valueOf(monthName.toUpperCase());
//                 return LocalDate.of(year, month, day);
//             } catch (Exception e) { /* ignore */ }
//         }
//         return null;
//     }
// }