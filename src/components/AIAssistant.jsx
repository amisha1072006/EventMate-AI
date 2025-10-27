import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

// --- Helper Functions ---

// Event Type
const getEventTypeFromMessage = (text) => {
  if (text.includes("bday") || text.includes("birthday")) return "Birthday Party";
  if (text.includes("wedding")) return "Wedding";
  if (text.includes("corporate") || text.includes("business")) return "Corporate Event";
  if (text.includes("engagement") || text.includes("sagai")) return "Engagement";
  return null;
};

// Date
const parseDateFromText = (text) => {
    const months = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12", january: "01", february: "02", march: "03", april: "04", june: "06", july: "07", august: "08", september: "09", october: "10", november: "11", december: "12" };
    
    // Regex 1: "october 28" ya "oct 28" (MONTH DAY)
    const monthDayRegex = /(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s(\d{1,2})(?:st|nd|rd|th)?(?:,?\s(\d{4}|\d{2})?)?/i;
    
    // Regex 2: "28 october" ya "28 oct" (DAY MONTH) - YEH NAYI LINE HAI
    const dayMonthRegex = /(\d{1,2})(?:st|nd|rd|th)?\s(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)(?:,?\s(\d{4}|\d{2})?)?/i;

    // Regex 3: "28-10-2025" ya "28/10/2025" (DD-MM-YYYY)
    const euRegex = /(\d{2})[-\s./](\d{2})[-\s./](\d{4})/;

    // Regex 4: "2025-10-28" (YYYY-MM-DD)
    const isoRegex = /(\d{4})[-\s./](\d{2})[-\s./](\d{2})/;

    let match;
    let day, monthName, year, month;

    // Function to get year
    const getYear = (yr) => {
        if (yr && yr.length === 2) return `20${yr}`;
        return yr || new Date().getFullYear(); // Use current year if not specified
    };

    // Check Regex 1 (MONTH DAY)
    match = text.match(monthDayRegex);
    if (match) {
        day = match[2];
        monthName = match[1].substring(0, 3).toLowerCase();
        year = getYear(match[3]);
        month = months[monthName];
        if (day && month && year) return `${year}-${month}-${String(day).padStart(2, '0')}`;
    }

    // Check Regex 2 (DAY MONTH) - YEH NAYA CHECK HAI
    match = text.match(dayMonthRegex);
    if (match) {
        day = match[1];
        monthName = match[2].substring(0, 3).toLowerCase();
        year = getYear(match[3]);
        month = months[monthName];
        if (day && month && year) return `${year}-${month}-${String(day).padStart(2, '0')}`;
    }

    // Check Regex 3 (DD-MM-YYYY)
    match = text.match(euRegex);
    if (match) return `${match[3]}-${match[2]}-${match[1]}`;
    
    // Check Regex 4 (YYYY-MM-DD)
    match = text.match(isoRegex);
    if (match) return `${match[1]}-${match[2]}-${match[3]}`;

    return null; // No date found
};


// Venue Name
const getVenueNameFromMessage = (text, venueList) => {
  // Find the longest matching venue name first to avoid partial matches
  let foundVenue = null;
  let longestMatchLength = 0;
  for (const venue of venueList) {
    if (text.includes(venue.hallName.toLowerCase()) && venue.hallName.length > longestMatchLength) {
      foundVenue = venue.hallName;
      longestMatchLength = venue.hallName.length;
    }
  }
  return foundVenue;
};

// Location
const getLocationFromMessage = (text) => {
  const locations = ["pune", "delhi", "mumbai", "bangalore", "lucknow", "chennai"];
  for (const loc of locations) {
    // Use word boundaries to avoid matching parts of words (e.g., "now" in "Lucknow")
    const regex = new RegExp(`\\b${loc}\\b`, 'i'); // 'i' for case-insensitive
    if (regex.test(text)) {
      return loc.charAt(0).toUpperCase() + loc.slice(1); // Capitalize first letter
    }
  }
  return null;
};

// Food Preference
const getFoodPrefFromMessage = (text) => {
  // Check for "non-veg" first as it contains "veg"
  if (/\bnon-?veg\b/i.test(text)) return "Non-Veg";
  if (/\bveg\b/i.test(text)) return "Veg"; // Only match "veg" if "non-veg" wasn't found
  if (/\bboth\b/i.test(text)) return "Both";
  return null;
};
// Budget Range
const getBudgetRangeFromMessage = (text) => {
    // Function to remove commas/spaces and parse as integer
    const parseNum = (numStr) => parseInt(String(numStr).replace(/[, ]/g, ''));

    // Regex to find numbers (digits with optional commas)
    const numRegexStr = "([\\d,]+(?:\\.\\d+)?)"; // Captures "10,000" or "10000"

    // 1. Check for ranges ("10000-20000", "10,000 to 20,000", "between 10000 and 20000")
    // (?i) flag for case-insensitive
    const rangeRegex = new RegExp(`(?:between\\s+)?${numRegexStr}\\s*(?:and|to|-)\\s*${numRegexStr}`, 'i');
    let match = text.match(rangeRegex);
    if (match) {
        return { minBudget: parseNum(match[1]), maxBudget: parseNum(match[2]) };
    }

    // 2. Check for "under/below/less than/max" (max budget)
    const underRegex = new RegExp(`(?:under|below|less than|max(?:imum)?(?: budget)?)\\s+${numRegexStr}`, 'i');
    match = text.match(underRegex);
    if (match) {
        return { minBudget: null, maxBudget: parseNum(match[1]) };
    }

    // 3. Check for "over/above/more than/min" (min budget)
    const overRegex = new RegExp(`(?:over|above|more than|min(?:imum)?(?: budget)?)\\s+${numRegexStr}`, 'i');
    match = text.match(overRegex);
    if (match) {
        return { minBudget: parseNum(match[1]), maxBudget: null };
    }
    
    // 4. Check for "around"
    const aroundRegex = new RegExp(`(?:around|approx(?:imately)?)\\s+${numRegexStr}`, 'i');
    match = text.match(aroundRegex);
     if (match) {
        const budget = parseNum(match[1]);
        const margin = budget * 0.2; // +/- 20%
        return { minBudget: Math.max(0, Math.floor(budget - margin)), maxBudget: Math.ceil(budget + margin) };
    }

    // 5. Fallback: just find numbers if "budget" is mentioned
    if (text.includes("budget")) {
        const numRegexGlobal = new RegExp(numRegexStr, 'g');
        const numbers = text.match(numRegexGlobal);
        if (numbers) {
            const parsedNumbers = numbers.map(parseNum).sort((a, b) => a - b);
            if (parsedNumbers.length === 1) {
                // If one number, assume "around"
                const budget = parsedNumbers[0];
                const margin = budget * 0.2; // +/- 20%
                return { minBudget: Math.max(0, Math.floor(budget - margin)), maxBudget: Math.ceil(budget + margin) };
            } else if (parsedNumbers.length > 1) {
                // If multiple numbers, assume min and max
                return { minBudget: parsedNumbers[0], maxBudget: parsedNumbers[parsedNumbers.length - 1] };
            }
        }
    }

    return { minBudget: null, maxBudget: null };
};
// Capacity
const getCapacityFromMessage = (text) => {
    // --- YEH REGEX UPDATE KIYA GAYA HAI ---
    // Ab yeh range ke baad "people", "guests", ya "capacity" shabd ZAROOR dhoondhega
    const rangeRegex = /(\d+)\s*[-to]+\s*(\d+)\s+(?:people|guests|capacity)\b/i; // 'i' for case-insensitive, \b for word boundary
    
    // --- YEH REGEX BHI UPDATE KIYA GAYA HAI ---
    // Ab yeh number ke baad "people" ya "guests" shabd ZAROOR dhoondhega
    const specificRegex = /(\d+)\s+(?:people|guests)\b/i;
    
    const capacityRegex = /\bcapacity\s*(\d+)\b/i; // Matches "capacity 500"
    const forRegex = /\bfor\s*(\d+)\b/i; // Matches "for 200" (less specific, use cautiously)

    let match = text.match(rangeRegex);
    if (match) return { minCapacity: parseInt(match[1]), maxCapacity: parseInt(match[2]) };

    match = text.match(specificRegex) || text.match(capacityRegex);
    if (match) {
        // If a specific number with keyword is mentioned, use it as minimum
        return { minCapacity: parseInt(match[1]), maxCapacity: null };
    }
    
    // Fallback for "for XXX" - use only if other patterns didn't match
    match = text.match(forRegex);
    if (match && !text.match(rangeRegex) && !text.match(specificRegex) && !text.match(capacityRegex)){
         return { minCapacity: parseInt(match[1]), maxCapacity: null };
    }

    return { minCapacity: null, maxCapacity: null }; // No capacity found
};

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm EventMate Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [allVenueNames, setAllVenueNames] = useState([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchVenueNames = async () => {
       try {
         const response = await axios.get("http://localhost:8080/api/halls");
         // Store full name for display, but maybe keep ID if needed later
         setAllVenueNames(response.data.map(hall => ({ hallId: hall.hallId, hallName: hall.hallName })));
       } catch (error) {
         console.error("Could not fetch venue names:", error);
       }
    };
    fetchVenueNames();
  }, []); // Empty array ensures this runs only once

  // --- HANDLE SEND FUNCTION (REVISED LOGIC) ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const messageText = input.trim();
    const lowerMessage = messageText.toLowerCase();
    setInput("");

    setMessages((prev) => [...prev, { sender: "bot", text: "🤖 Searching..." }]);

    // Extract ALL possible entities
    const eventType = getEventTypeFromMessage(lowerMessage);
    const detectedDate = parseDateFromText(lowerMessage);
    const venueName = getVenueNameFromMessage(lowerMessage, allVenueNames);
    const location = getLocationFromMessage(lowerMessage);
    const foodPref = getFoodPrefFromMessage(lowerMessage);
    const budgetInfo = getBudgetRangeFromMessage(lowerMessage); // Pehle budgetInfo nikala
      const capacityInfo = getCapacityFromMessage(lowerMessage); // Phir capacityInfo nikal
    // --- YEH LINES ADD KARNI HAIN ---
    // Destructure karein taaki neeche waali conditions kaam karein
    const { minBudget, maxBudget } = budgetInfo;       // budgetInfo se min/max nikalo
    const { minCapacity, maxCapacity } = capacityInfo; // capacityInfo se min/max nikalo
        let botReply = "";
    let calledSpecificAPI = false;

    // --- Logic based on extracted entities ---
    // Priority 1: Specific Hall + Date Check
    if (venueName && detectedDate) {
      calledSpecificAPI = true;
      try {
        const response = await axios.get(`http://localhost:8080/api/halls/check-availability?hallName=${encodeURIComponent(venueName)}&date=${detectedDate}`);
        botReply = response.data.message; // Message from backend
      } catch (err) {
        console.error("Error checking specific hall:", err);
        botReply = "⚠️ Sorry, I couldn't check that specific venue.";
      }
    }
    // Priority 2: General Search (if date, location, food, budget, or capacity is present)
    else if (detectedDate || location || foodPref || minBudget !== null || maxBudget !== null || minCapacity !== null || maxCapacity !== null || eventType || messageText.includes("venue")) {
      calledSpecificAPI = true;
      try {
        const params = new URLSearchParams();
        if (detectedDate) params.append('date', detectedDate);
        if (location) params.append('location', location);
        if (foodPref) params.append('food', foodPref); // Send "Veg", "Non-Veg", or "Both"
        if (minBudget !== null) params.append('minBudget', minBudget);
        if (maxBudget !== null) params.append('maxBudget', maxBudget);
        if (minCapacity !== null) params.append('minCapacity', minCapacity);
        if (maxCapacity !== null) params.append('maxCapacity', maxCapacity);
        if (eventType) params.append('eventType', eventType);


        console.log("Calling /search with params:", params.toString()); // DEBUGGING

        const response = await axios.get(`http://localhost:8080/api/halls/search?${params.toString()}`);

        if (response.status === 204 || response.data.length === 0) {
          botReply = "Sorry, I couldn't find any venues matching all your criteria.";
          if (params.toString().includes('&')) {
            botReply += " You could try removing some filters.";
          }
        } else {
          const hallNames = response.data.map(hall => hall.hallName).join('\n• ');
          let criteriaDesc = [];
          if (location) criteriaDesc.push(`in ${location}`);
          if (foodPref) criteriaDesc.push(`with ${foodPref} food`);
          if (minBudget !== null && maxBudget !== null) criteriaDesc.push(`between ₹${minBudget.toLocaleString()}-₹${maxBudget.toLocaleString()}`); // Added formatting
          else if (minBudget !== null) criteriaDesc.push(`above ₹${minBudget.toLocaleString()}`);//
          else if (maxBudget !== null) criteriaDesc.push(`under ₹${maxBudget.toLocaleString()}`);
          if (minCapacity !== null && maxCapacity !== null) criteriaDesc.push(`for ${minCapacity}-${maxCapacity} guests`);
          else if (minCapacity !== null) criteriaDesc.push(`for ${minCapacity}+ guests`);
          if (detectedDate) criteriaDesc.push(`available on ${detectedDate}`);

          botReply = `Okay, I found these venues ${criteriaDesc.join(' ')}:\n• ${hallNames}`;
        }
      } catch (err) {
        console.error("Error during hall search:", err);
        if (err.response) { console.error("Backend Error:", err.response.data); }
        botReply = "⚠️ Sorry, I had trouble searching for venues.";
      }
    }
    // Priority 3: Only Event Type search
    else if (eventType) {
      calledSpecificAPI = true;
      try {
        console.log("Calling /by-event-type with type:", eventType); // DEBUGGING
        const response = await axios.get(`http://localhost:8080/api/halls/by-event-type?type=${encodeURIComponent(eventType)}`);
        if (response.status === 204 || response.data.length === 0) {
          botReply = `Sorry, I couldn't find any specific venues listed primarily for ${eventType}.`;
        } else {
          const hallNames = response.data.map(hall => hall.hallName).join('\n• ');
          botReply = `Here are venues suitable for a ${eventType}:\n• ${hallNames}`;
        }
      } catch (err) {
        console.error("Error fetching by event type:", err);
        if (err.response) { console.error("Backend Error:", err.response.data); }
        botReply = "⚠️ Sorry, I had trouble getting that list.";
      }
    }
    // Priority 4: Fallback to Project Q&A (Technical Questions)
if (!calledSpecificAPI) {
    let projectQaReply = "";
    try {
        // नया API endpoint कॉल करें जो ProjectKnowledgeService का उपयोग करता है
        const response = await axios.post("http://localhost:8080/api/project-qa/ask", {
            query: messageText // यूजर का पूरा मैसेज भेजें
        });
        projectQaReply = response.data.answer;
        
        // यदि जवाब में "no specific information" है, तो सामान्य Fallback पर जाएँ
        if (projectQaReply && projectQaReply.includes("no specific information")) {
             botReply = "Sorry, I can mainly help with finding venues based on date, location, budget, capacity, food preference, or event type. For project questions, please be specific (e.g., 'What is Hall.java' or 'What does JwtAuthFilter do?').";
        } else {
            // यदि कोई सटीक जवाब मिला, तो उसे botReply में रखें
            botReply = projectQaReply;
           // calledSpecificAPI = true; // सुनिश्चित करें कि हमने कुछ किया है
        }
    } catch (err) {
        console.error("Error calling Project QA API:", err);
        // यदि API कॉल में एरर है, तो सामान्य Fallback दिखाएँ
        botReply = "⚠️ Unable to reach the Project QA server. Check your backend connection.";
    }
}

    // Update message
    setMessages((prev) => {
      const updated = [...prev];
      const searchMsgIndex = updated.findIndex(m => m.text === "🤖 Searching...");
      if (searchMsgIndex !== -1) {
          updated[searchMsgIndex] = { sender: "bot", text: botReply };
      } else {
          // Fallback if "Searching..." was missed
          updated[updated.length - 1] = { sender: "bot", text: botReply };
      }
      return updated;
    });
  };
  // --- HANDLE SEND FUNCTION KHATAM ---
  return (
     <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
            backgroundColor: "#4A90E2", // Brighter blue
            color: "white",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: 'none', // Remove border
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)", // Stronger shadow
            cursor: "pointer",
            fontSize: '24px', // Larger emoji
            transition: 'transform 0.2s ease-in-out', // Add transition
         }}
         // Add hover effect
         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
          🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'absolute', // Position relative to the button container
            bottom: '75px', // Place above the button
            right: '0', // Align to the right
            width: "340px", // Slightly wider
            height: "500px", // Slightly taller
            backgroundColor: "#f9f9f9", // Lighter background
            border: "1px solid #ddd", // Subtle border
            borderRadius: "15px", // Softer corners
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)", // Softer shadow
            transition: 'opacity 0.3s ease, transform 0.3s ease', // Animation
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          {/* Header */}
          <div
            style={{
              //backgroundColor: "#4A90E2", // Match button blue
              backgroundColor: "black",
              color: "white",
              padding: "12px 15px", // Adjust padding
              fontWeight: "600", // Slightly bolder
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1rem", // Standard size
              borderTopLeftRadius: '15px', // Match parent rounding
              borderTopRightRadius: '15px',
            }}
          >
            <span>EventMate Bot 🤖</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1.1rem", // Slightly larger close icon
                padding: '5px' // Easier to click
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "15px", // More padding
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px", // Slightly more space
              background: '#ffffff', // White message area background
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                  backgroundColor: msg.sender === "bot" ? "#ECEFF1" : "#4A90E2", // Bot: light grey, User: blue
                  color: msg.sender === "bot" ? "#263238" : "#fff", // Darker text for bot
                  padding: "10px 15px", // Adjust padding
                  borderRadius: "20px", // More rounded bubbles
                  maxWidth: "85%", // Allow slightly wider messages
                  whiteSpace: "pre-line", // Keep line breaks
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)", // Subtle shadow on bubbles
                  wordWrap: 'break-word', // Ensure long words wrap
                  fontSize: '0.95rem' // Slightly adjust font size
                }}
              >
                {/* Render text, potentially handling markdown or links later */}
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div> {/* For auto-scrolling */}
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: "10px 15px", borderTop: "1px solid #ddd", background: '#f0f0f0' }}>
             <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSend()}
               placeholder="Ask me about venues..." // More specific placeholder
               style={{
                 flex: 1,
                 padding: "10px 15px", // Match button padding
                 borderRadius: "20px", // Match bubble rounding
                 border: "1px solid #ccc",
                 outline: "none",
                 fontSize: '0.95rem',
               }}
             />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "10px", // More space
                backgroundColor: "#4A90E2", // Match user bubble/button blue
                color: "white",
                border: "none",
                padding: "10px 18px", // Adjust padding
                borderRadius: "20px", // Match input rounding
                fontWeight: "600", // Bolder text
                cursor: "pointer",
                fontSize: '0.95rem',
                transition: 'background-color 0.2s ease', // Hover effect
              }}
              // Add hover effect
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#357ABD'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4A90E2'}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AIAssistant;























// import React, { useState, useRef, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const AIAssistant = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "👋 Hi! Welcome to EventMate." },
//   ]);
//   const [input, setInput] = useState("");
//   const [userName, setUserName] = useState(null);
//   const [awaitingName, setAwaitingName] = useState(false);
//   const [redirectAction, setRedirectAction] = useState(null); // "login", "about", "contact"
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     const userMessage = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setTimeout(() => handleBotResponse(input.trim().toLowerCase()), 300);
//     setInput("");
//   };

//   const handleBotResponse = (lower) => {
//     // Handle redirect question
//     if (redirectAction) {
//       if (lower === "yes" || lower === "y") {
//         if (redirectAction === "login") navigate("/Login");
//         if (redirectAction === "about") navigate("/About");
//         if (redirectAction === "contact") navigate("/Contact");
//         setRedirectAction(null);
//         setMessages(prev => [...prev, { sender: "bot", text: "Redirecting..." }]);
//         return;
//       } else {
//         setRedirectAction(null);
//         showMenu();
//         return;
//       }
//     }

//     // Ask name if not known
//     if (!userName && awaitingName) {
//       setUserName(lower);
//       setAwaitingName(false);
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: `Nice to meet you, ${lower}! 🎉` },
//         { sender: "bot", text: "Type 'menu' to see options." },
//       ]);
//       return;
//     }

//     if (!userName && lower === "hi" || lower=="hello") {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "Hello! 😊 What's your name?" },
//       ]);
//       setAwaitingName(true);
//       return;
//     }

//     // Main menu
//     if (lower === "menu") {
//       showMenu();
//       return;
//     }

//     // Option 1: About
//     if (lower.includes("about") || lower === "1") {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "EventMate is your one-stop platform for booking event halls! 🎉" },
//         { sender: "bot", text: "Do you want to visit the About page?" },
//       ]);
//       setRedirectAction("about");
//       return;
//     }

//     // Option 2: Book
//     if (lower.includes("book") || lower === "2") {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "You need to login before booking a hall." },
//         { sender: "bot", text: "Do you want to go to the Login page now?" },
//       ]);
//       setRedirectAction("login");
//       return;
//     }

//     // Option 3: Contact
//     if (lower.includes("contact") || lower === "3") {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "You can contact us for any queries." },
//         { sender: "bot", text: "Do you want to visit the Contact page?" },
//       ]);
//       setRedirectAction("contact");
//       return;
//     }

//     // Option 4: Facilities (single step)
//     if (lower.includes("facilities") || lower === "4") {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "🏢 Facilities:\n✔️ Spacious halls\n✔️ AC & backup\n✔️ Sound system\n✔️ Catering\n✔️ 24/7 support" },
//       ]);
//       return;
//     }

//     // Exit
//     if (lower === "bye") {
//       setMessages(prev => [...prev, { sender: "bot", text: `Goodbye ${userName || "friend"} 👋` }]);
//       setTimeout(() => setOpen(false), 500);
//       return;
//     }

//     setMessages(prev => [...prev, { sender: "bot", text: "😅 I didn't understand. Type 'menu' to see options." }]);
//   };

//   const showMenu = () => {
//     setMessages(prev => [
//       ...prev,
//       { sender: "bot", text: `${userName || "Friend"}, here are the options:` },
//       { sender: "bot", text: "1️⃣ About EventMate" },
//       { sender: "bot", text: "2️⃣ Book a Hall" },
//       { sender: "bot", text: "3️⃣ Contact Us" },
//       { sender: "bot", text: "4️⃣ Facilities Provided" },
//       { sender: "bot", text: "❌ Type 'bye' to exit" },
//     ]);
//   };

//   return (
//     <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           backgroundColor: "#e0e0e0",
//           color: "#555",
//           width: "60px",
//           height: "60px",
//           borderRadius: "50%",
//           fontWeight: "bold",
//           fontSize: "16px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//           cursor: "pointer",
//         }}
//       >
//         🤖
//       </button>

//       {/* Chat Window */}
//       {open && (
//         <div
//           style={{
//             marginTop: "10px",
//             width: "320px",
//             height: "450px",
//             backgroundColor: "#f0f0f0",
//             border: "2px solid #ccc",
//             borderRadius: "20px",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//           }}
//         >
//           {/* Header */}
//           <div
//             style={{
//               backgroundColor: "#555",
//               color: "white",
//               padding: "10px",
//               fontWeight: "bold",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               fontSize: "16px",
//             }}
//           >
//             <span>EventMate Bot 🤖</span>
//             <button
//               onClick={() => setOpen(false)}
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "white",
//                 cursor: "pointer",
//                 fontSize: "18px",
//               }}
//             >
//               <FaTimes />
//             </button>
//           </div>

//           {/* Messages */}
//           <div
//             style={{
//               flex: 1,
//               padding: "10px",
//               overflowY: "auto",
//               display: "flex",
//               flexDirection: "column",
//               gap: "8px",
//             }}
//           >
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 style={{
//                   alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
//                   backgroundColor: msg.sender === "bot" ? "#d0d0d0" : "#888",
//                   color: msg.sender === "bot" ? "#000" : "#fff",
//                   padding: "6px 10px",
//                   borderRadius: "15px",
//                   maxWidth: "80%",
//                   whiteSpace: "pre-line",
//                 }}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             <div ref={chatEndRef}></div>
//           </div>

//           {/* Input */}
//           <div style={{ display: "flex", padding: "8px", borderTop: "1px solid #bbb" }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="Type a message..."
//               style={{
//                 flex: 1,
//                 padding: "6px 10px",
//                 borderRadius: "12px",
//                 border: "1px solid #aaa",
//                 outline: "none",
//               }}
//             />
//             <button
//               onClick={handleSend}
//               style={{
//                 marginLeft: "6px",
//                 backgroundColor: "#555",
//                 color: "white",
//                 border: "none",
//                 padding: "6px 12px",
//                 borderRadius: "12px",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIAssistant;





// // import React, { useState, useRef, useEffect } from "react";
// // import { FaTimes } from "react-icons/fa";

// // const AIAssistant = () => {
// //   const [open, setOpen] = useState(false);
// //   const [messages, setMessages] = useState([{ sender: "bot", text: "👋 Hi! Welcome to EventMate." }]);
// //   const [input, setInput] = useState("");
// //   const chatEndRef = useRef(null);

// //   useEffect(() => {
// //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const handleSend = async () => {
// //     if (!input.trim()) return;

// //     const userMessage = { sender: "user", text: input };
// //     setMessages((prev) => [...prev, userMessage]);
// //     const messageText = input.trim();
// //     setInput("");

// //     // Add typing placeholder
// //     setMessages((prev) => [...prev, { sender: "bot", text: "🤖 Typing..." }]);

// //     try {
// //       const response = await fetch("http://localhost:8080/api/chat/message", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ message: messageText }),
// //       });

// //       const data = await response.json();

// //       // Replace typing placeholder with actual reply
// //       setMessages((prev) => {
// //         const updated = [...prev];
// //         const typingIndex = updated.findIndex((m) => m.text === "🤖 Typing...");
// //         if (typingIndex !== -1) updated[typingIndex] = { sender: "bot", text: data.reply || "⚠️ No response from AI server." };
// //         return updated;
// //       });
// //     } catch (error) {
// //       console.error(error);
// //       setMessages((prev) => {
// //         const updated = [...prev];
// //         const typingIndex = updated.findIndex((m) => m.text === "🤖 Typing...");
// //         if (typingIndex !== -1) updated[typingIndex] = { sender: "bot", text: "⚠️ Unable to reach the server." };
// //         return updated;
// //       });
// //     }
// //   };



// // export default AIAssistant;



