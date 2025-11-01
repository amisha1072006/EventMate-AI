// src/components/Header.jsx

import React from 'react';
import './Navbar.css'; // Navbar ki styling ke liye CSS file ko import karein
import { Link } from 'react-router-dom'; // React Router se Link ko import karein

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        {/* Logo ke liye Link tag */}
        <Link to="/" className="logo">EventMate AI</Link>

        {/* Navigation Links ke liye Link tags */}
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;