
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowSignupOptions(false);
    setShowLoginOptions(false);
  };

  const handleSignupOption = (path) => {
    navigate(path);
    closeModal(); // close modal automatically
  };

  const handleLoginOption = (path) => {
    navigate(path);
    closeModal(); // close modal automatically
  };

  return (
    <div className="navbar">
      {/* Left side */}
      <Link to="/" className="logo">EventMate AI</Link>

      {/* Right side */}
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <Link className="nav-links" onClick={() => setShowLoginOptions(true)}>
          Login
        </Link>
        <Link className="nav-links" onClick={() => setShowSignupOptions(true)}>
          SignUp
        </Link>
      </div>

      {/* Signup Modal */}
      {showSignupOptions && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Sign up as</h3>
            <button
              className="option-btn"
              onClick={() => handleSignupOption('/signup')}
            >
              User
            </button>
            <button
              className="option-btn"
              onClick={() => handleSignupOption('/signup-owner')}
            >
              Owner
            </button>
            <button className="close-btn" onClick={closeModal}>✕</button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginOptions && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Login as</h3>
            <button
              className="option-btn"
              onClick={() => handleLoginOption('/login')}
            >
              User
            </button>
            <button
              className="option-btn"
              onClick={() => handleLoginOption('/login-owner')}
            >
              Owner
            </button>
            <button className="close-btn" onClick={closeModal}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
