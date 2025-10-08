import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; //  इसे import करना ज़रूरी है

// --- Styles (CSS Code) ---
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
    boxShadow: '0 4px 20px rgba(252, 251, 241, 0.1)',
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
    wordBreak: 'break-word',
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
    backgroundColor: '#5f593cff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
};

// --- Component Code ---
function EmailOtp() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth(); //  AuthContext से login फंक्शन निकालें

    const email = location.state?.email;

    // अगर URL में सीधे आने से email नहीं मिला, तो login पेज पर वापस भेजें
    if (!email) {
        // यह useEffect के अंदर होना बेहतर है, लेकिन अभी के लिए यह काम करेगा
        React.useEffect(() => {
            navigate('/login');
        }, [navigate]);
        return null;
    }

    const handleVerifySubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/verify-otp', { email, otp });
            const apiToken = response.data.token;

            if (apiToken) {
                login(apiToken); //  टोकन को AuthContext और localStorage में सेव करें
                alert("Account verified successfully!");
                navigate('/FindHall'); //  अब FindHall पेज पर भेजें
            } else {
                alert("Verification failed: Token not received from server.");
            }
        } catch (error) {
            console.error('Verification failed:', error);
            const errorMessage = error.response?.data || 'Invalid OTP or an error occurred.';
            alert(errorMessage);
        }
    };

    return (
        <div style={containerStyles}>
            <div style={formWrapperStyles}>
                <h1 style={headingStyles}>Verify Your Account</h1>
                <p style={subtextStyles}>
                    An OTP has been sent to *{email}*. Please enter it below.
                </p>
                <form onSubmit={handleVerifySubmit}>
                    <input
                        type="text"
                        placeholder="_ _ _ _ _ _"
                        style={inputStyles}
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
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

















