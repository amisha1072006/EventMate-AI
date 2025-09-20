import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="logo">EventMate AI</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;