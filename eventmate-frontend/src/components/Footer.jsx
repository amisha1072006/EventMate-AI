import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>EventMate AI</h4>
            <p>
              Your intelligent partner in crafting unforgettable events. We use AI to simplify planning and booking.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faqs">FAQS</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Subscribe to our Newsletter</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="copyright">
          © 2025 EventMate AI, All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;