import React from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1: Import kiya

// --- Styles (CSS Code) ---
// (Styles waise hi rahenge jaise pehle the)
const containerStyles = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh',
    backgroundColor: '#f7f7f7', padding: '20px',
};
const formWrapperStyles = {
    backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', width: '100%',
    maxWidth: '450px', textAlign: 'center',
};
const headingStyles = {
    marginBottom: '15px', fontSize: '28px', color: '#333',
};
const subtextStyles = {
    marginBottom: '30px', fontSize: '16px', color: '#666',
};
const inputStyles = {
    width: '100%', padding: '12px', marginBottom: '25px', border: '1px solid #ccc',
    borderRadius: '5px', fontSize: '16px', boxSizing: 'border-box',
};
const buttonStyles = {
    width: '100%', padding: '12px', backgroundColor: '#5d5e42ff', color: '#ffffff',
    border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
};


// --- Component Code ---
function ForgotPass() {
  const navigate = useNavigate(); // Step 2: Active kiya

  // Step 3: Naya function banaya
  const handleResetClick = (event) => {
    event.preventDefault(); // Page reload hone se rokega
    navigate('/ResetPassOtp'); // Agle page par bhejega
  };

  return (
    <div style={containerStyles}>
      <div style={formWrapperStyles}>
        
        <h1 style={headingStyles}>Forgot Your Password?</h1>

        <p style={subtextStyles}>
          No worries! Just enter your email address below and we'll send you a link to reset it.
        </p>

        {/* Step 4: Function ko form se joda */}
        <form onSubmit={handleResetClick}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            style={inputStyles}
          />
          <button type="submit" style={buttonStyles}>
            Send Reset Link
          </button>
        </form>

      </div>
    </div>
  );
}

export default ForgotPass;