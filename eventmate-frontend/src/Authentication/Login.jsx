import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Apne AuthContext ka path check kar lein
import axios from 'axios';
import './AuthForm.css'; // Aapki CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Show/Hide ke liye state
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const userCredentials = { email, password };
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', userCredentials);
      const apiToken = response.data.token; 

      if (apiToken) {
        login(apiToken);
        alert("Login successful!");
        navigate('/EmailOtp'); // Login ke baad homepage par redirect karein
      } else {
        alert("Login failed: Token not received from server.");
      }
    } catch (error) {
        console.error('Login failed:', error);
        const errorMessage = error.response?.data || 'Login failed. An unknown error occurred.';
        alert(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login Here</h2>
        
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
          <p><Link to="/signup">Create an account</Link></p>
          <p><Link to="/forgot-password">Forgot password?</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;