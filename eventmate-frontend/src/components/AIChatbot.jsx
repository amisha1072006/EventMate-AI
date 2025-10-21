import React, { useState } from 'react';

const AIChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, user: 'user' }]);

    // Abhi hum ek simulated (nakli) response de rahe hain.
    // Asli AI assistant ke liye, yahaan aapko ek API call karna hoga.
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "Namaste! Main EventMate AI ke baare mein aapki kaise madad kar sakta hoon?", user: 'ai' }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="chatbot-modal">
      <div className="chatbot-header">
        <h3>AI Assistant</h3>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="chatbot-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Apna sawal likhein..."
        />
        <button onClick={handleSendMessage}>Bhejein</button>
      </div>
    </div>
  );
};

export default AIChatbot;