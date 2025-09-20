import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to EventMate AI</h1>
        <p>Your intelligent event planning and booking platform</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for venues (e.g., weddings, parties)..." />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;