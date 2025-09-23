import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { useAuth } from '../Context/AuthContext'; // ✨ AuthContext ko import karein

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✨ login function context se lein

  const handleSignup = (e) => {
    e.preventDefault();
    // Yahan par aap apni asli signup API call karenge
    console.log('Signing up with:', { name, email, password });

    // --- API Call Simulation ---
    // Maan lijiye signup successful hua aur API ne token wapas bheja
    const fakeApiToken = '12345-abcde-67890-fghij';

    // Signup ke baad user ko automatically login kar dein
    login(fakeApiToken);

    // User ko dashboard ya kisi private page par bhej dein
    navigate('/FindHall');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Sign Up Here</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="auth-button">Sign Up</button>
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;