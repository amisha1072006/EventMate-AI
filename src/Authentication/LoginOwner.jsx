import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';

const LoginOwner = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const ownerCredentials = { email, password };

    try {
      // Use your backend API endpoint for owner login
      const response = await axios.post('http://localhost:8080/api/auth/login-owner', ownerCredentials);

      alert(response.data);
      navigate('/owner-email-otp', { state: { email: email } });
    } catch (error) {
      console.error('Owner login failed:', error);
      const errorMessage = error.response?.data || 'Login failed. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Owner Login</h2>
        
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
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                fontSize: '18px'
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>
        
        <button type="submit" className="auth-button">Login</button>
        
        
        <div className="auth-links-split">
            <h4>Don't have an account?</h4>
            <p><Link to="/signup-owner">Create an account</Link></p>
          </div>
          <div className="forgot-section">
            <p><Link to="/forgot-password">Forgot password?</Link></p>
          </div>
       
      </form>
    </div>
  );
};

export default LoginOwner;
