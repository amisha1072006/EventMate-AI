import React, { useState } from 'react'; // 'useState' ko import karein

// --- Styles (CSS Code) ---
// (Styles lagbhag pehle jaise hi hain)
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
  borderRadius: '5px', fontSize: '20px', textAlign: 'center', letterSpacing: '5px',
  boxSizing: 'border-box',
};
const buttonStyles = {
  width: '100%', padding: '12px', backgroundColor: '#7e8069ff', color: '#ffffff',
  border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
};
// --- Naye Success Message ke liye Styles ---
const successIconStyles = {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
};
const successTextStyles = {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.6',
};


// --- Component Code ---
function ResetPassOtp() {
  // Step 1: Ek state banayein jo yaad rakhega ki form submit hua ya nahi.
  // Shuru mein yeh 'false' rahega.
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Step 2: Yeh function form submit hone par state ko 'true' kar dega.
  const handleOtpSubmit = (event) => {
    event.preventDefault(); // Page reload hone se rokega
    setIsSubmitted(true); // State ko update karega
  };

  return (
    <div style={containerStyles}>
      <div style={formWrapperStyles}>
        
        {/* Step 3: Yahaan hum check karenge ki form submit hua hai ya nahi */}
        
        {isSubmitted ? (
          // Agar form submit ho gaya hai (isSubmitted === true), toh yeh Success Message dikhega
          <div>
            <svg style={successIconStyles} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#28a745"/>
            </svg>
            <h1 style={headingStyles}>Success!</h1>
            <p style={successTextStyles}>
              Password reset link has been successfully sent to your email address. Please check your inbox.
            </p>
          </div>

        ) : (
          // Agar form submit nahi hua hai (isSubmitted === false), toh yeh OTP Form dikhega
          <div>
            <h1 style={headingStyles}>Enter Verification Code</h1>
            <p style={subtextStyles}>
              A One-Time Password (OTP) has been sent to your registered email address.
            </p>
            <form onSubmit={handleOtpSubmit}>
              <input 
                type="text"
                placeholder="_ _ _ _ _ _" 
                style={inputStyles}
                maxLength="6"
              />
              <button type="submit" style={buttonStyles}>
                Submit
              </button>
            </form>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default ResetPassOtp;