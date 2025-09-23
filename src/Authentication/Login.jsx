import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { useAuth } from '../Context/AuthContext'; // ✨ AuthContext ko import karein

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✨ login function context se lein

  const handleLogin = (e) => {
    e.preventDefault();
    // Yahan par aap apni asli API call karenge
    console.log('Logging in with:', { email, password });
    
    // --- API Call Simulation ---
    // For example, API se aapko ek token mila
    const fakeApiToken = '12345-abcde-67890-fghij';
    
    // login function call karein aur token pass karein
    login(fakeApiToken);
    
    // User ko dashboard ya kisi private page par bhej dein
    navigate('/EmailOtp'); 
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
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="auth-button">Login</button>
        
        <div className="auth-links-split">
          {/* ✨ Page reload se bachne ke liye <Link> ka istemal karein */}
          <p><Link to="/signup">Create an account</Link></p>
          <p><Link to="/forgot-password">forgot-password?</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;