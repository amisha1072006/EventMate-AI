import React from 'react';
import { useNavigate } from 'react-router-dom'; // Page badalne ke liye

// --- Styles (CSS Code) ---
// Page ko sundar banane ke liye saare styles
const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  backgroundColor: '#f7f7f7',
  padding: '20px',
};

const formWrapperStyles = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '450px',
  textAlign: 'center',
};

const headingStyles = {
  marginBottom: '15px',
  fontSize: '28px',
  color: '#333',
};

const subtextStyles = {
    marginBottom: '30px',
    fontSize: '16px',
    color: '#666',
};

const inputStyles = {
  width: '100%',
  padding: '12px',
  marginBottom: '25px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '20px',
  textAlign: 'center',
  letterSpacing: '5px',
  boxSizing: 'border-box',
};

const buttonStyles = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#5b582fff', // Primary blue color
  color: '#ffffff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
};


// --- Component Code ---
function EmailOtp() {
  // Login ke baad Dashboard page par jaane ke liye
  const navigate = useNavigate();

  // Form submit hone par yeh function chalega
  const handleVerifySubmit = (event) => {
    event.preventDefault(); // Page ko reload hone se rokega
    
    // Yahaan aap OTP ko backend se verify karwaayengi.
    // Agar OTP sahi hai, to user ko Dashboard page par bhej dein.
    navigate('/FindHall'); 
  };

  return (
    <div style={containerStyles}>
      <div style={formWrapperStyles}>
        
        <h1 style={headingStyles}>Verify Your Account</h1>

        <p style={subtextStyles}>
          We've sent a verification code to your email. Please enter it below to complete your login.
        </p>

        <form onSubmit={handleVerifySubmit}>
          <input 
            type="text"
            placeholder="_ _ _ _ _ _" 
            style={inputStyles}
            maxLength="6"
            required // Sunishchit karein ki user ise khaali na chhode
          />
          <button type="submit" style={buttonStyles}>
            Verify Account
          </button>
        </form>

      </div>
    </div>
  );
}

export default EmailOtp;