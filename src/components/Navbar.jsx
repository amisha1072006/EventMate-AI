import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure this path is correct

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Left side */}
      <Link to="/" className="logo">EventMate AI</Link>

      {/* Right side */}
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
};

export default Navbar;
