import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm EventMate Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const messageText = input.trim();
    setInput("");

    // Show "typing" bubble
    setMessages((prev) => [...prev, { sender: "bot", text: "🤖 Typing..." }]);

    try {
      const response = await fetch("http://localhost:8080/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      // Replace typing bubble with AI reply
      setMessages((prev) => {
        const updated = [...prev];
        const index = updated.findIndex((m) => m.text === "🤖 Typing...");
        if (index !== -1)
          updated[index] = {
            sender: "bot",
            text: data.reply || "⚠️ No response from AI server.",
          };
        return updated;
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        const index = updated.findIndex((m) => m.text === "🤖 Typing...");
        if (index !== -1)
          updated[index] = {
            sender: "bot",
            text: "⚠️ Unable to reach the AI server. Please try again later.",
          };
        return updated;
      });
    }
  };

    return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: "#e0e0e0",
          color: "#555",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontWeight: "bold",
          fontSize: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            marginTop: "10px",
            width: "320px",
            height: "450px",
            backgroundColor: "#f0f0f0",
            border: "2px solid #ccc",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#080808",
              color: "white",
              padding: "10px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "16px",
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
                fontSize: "18px",
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                  backgroundColor: msg.sender === "bot" ? "#d0d0d0" : "#888",
                  color: msg.sender === "bot" ? "#000" : "#fff",
                  padding: "6px 10px",
                  borderRadius: "15px",
                  maxWidth: "80%",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: "8px", borderTop: "1px solid #bbb" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "6px 10px",
                borderRadius: "12px",
                border: "1px solid #aaa",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "6px",
                backgroundColor: "#080808",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
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



