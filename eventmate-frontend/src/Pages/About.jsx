// src/Pages/About.jsx

import React from 'react';
import './About.css'; // Sabse zaroori step: CSS file ko import karein

const About = () => {
  return (
    <div className="about-container"> {/* Ek main container div */}

      {/* Section 1: Top Banner */}
      <section className="top-banner">
        <h1>EventMate - Plan Smarter, Celebrate Better</h1>
        <p>Your AI-Powered Event Planner and Scheduler to organize flawless events effortlessly.</p>
      </section>

      {/* Section 2: About EventMate */}
      <section className="about-section">
        <h2>About EventMate</h2>
        <p>EventMate is your smart AI-based event planner designed to simplify the way you organize and schedule events. From birthdays to conferences, EventMate helps you save time, reduce stress, and create unforgettable experiences with ease.</p>
      </section>

      {/* Section 3: Features */}
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            {/* <i className="icon-class"></i>  Icon ke liye baad me add kar sakte hain */}
            <h3>Smart Scheduling</h3>
            <p>Automatically generates optimized event schedules using AI.</p>
          </div>
          <div className="feature-item">
            {/* <i className="icon-class"></i> */}
            <h3>Venue Management</h3>
            <p>Suggests the best venues and manages bookings with ease.</p>
          </div>
          <div className="feature-item">
            {/* <i className="icon-class"></i> */}
            <h3>Real-time Updates</h3>
            <p>Keep track of changes and updates instantly.</p>
          </div>
          <div className="feature-item">
            {/* <i className="icon-class"></i> */}
            <h3>Personalized Recommendations</h3>
            <p>Receive AI-powered suggestions for themes, vendors, and event ideas.</p>
          </div>
          <div className="feature-item">
            {/* <i className="icon-class"></i> */}
            <h3>Task Management</h3>
            <p>Organize, assign, and track all event tasks in one platform.</p>
          </div>
          <div className="feature-item">
            {/* <i className="icon-class"></i> */}
            <h3>Analytics & Insights</h3>
            <p>Gain actionable insights on attendee engagement and performance.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Our Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>At EventMate, our mission is to empower people to focus on what truly matters – enjoying their events. By automating planning tasks and simplifying scheduling, we aim to make every celebration stress-free and memorable.</p>
      </section>

      {/* Section 5: Call to Action (CTA) */}
      <section className="cta-section">
        <h2>Ready to Plan Your Event?</h2>
        <p>Let EventMate handle the stress while you enjoy the success.</p>
        <a href="/contact" className="cta-button">Contact Us</a>
      </section>

    </div>
  );
};

export default About;