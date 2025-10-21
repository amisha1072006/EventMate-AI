import React from 'react';

// onClick prop ko yahan add karein
const AIAssistant = ({ onClick }) => { 
  return (
    // onClick event listener ko div par lagayein
    <div className="ai-assistant-btn" onClick={onClick}>
      <span>AI</span>
      Assistant
    </div>
  );
};

export default AIAssistant;