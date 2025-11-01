import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css'; // आपकी CSS फाइल

// AuthContext को यहाँ से हटा दिया गया है, क्योंकि टोकन अब OTP वेरिफिकेशन के बाद ही मिलेगा।

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const userCredentials = { email, password };
    
    try {
      // Step 1: Backend को लॉगिन रिक्वेस्ट भेजें।
      // Backend अब टोकन नहीं, सिर्फ एक सफलता का मैसेज भेजेगा।
      const response = await axios.post('http://localhost:8080/api/auth/login', userCredentials);
      
      // Step 2: Backend से आए मैसेज को alert में दिखाएं (जैसे, "OTP sent to your email...")
      alert(response.data);
      
      // Step 3: User को OTP वाले पेज पर भेजें और email को state में पास करें।
      // यह ज़रूरी है ताकि OTP पेज को पता हो कि किसका ईमेल वेरिफाई करना है।
      navigate('/EmailOtp', { state: { email: email } }); 

    } catch (error) {
        console.error('Login failed:', error);
        const errorMessage = error.response?.data || 'Login failed. An unknown error occurred.';
        alert(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>User Login</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer', border: 'none', background: 'transparent', fontSize: '18px' }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>
        
        <button type="submit" className="auth-button">Login</button>
        
  
   <div className="auth-links-split">
            <h4>Don't have an account?</h4>
            <p><Link to="/signup">Create an account</Link></p>
          </div>
          <div className="forgot-section">
            <p><Link to="/forgot-password">Forgot password?</Link></p>
          </div>

      </form>
    </div>
  );
};

export default Login;