import React, { useState } from "react";
import "./ContactEventmate.css";

const ContactEventmate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log data. Later connect to backend
    console.log("Contact form submitted:", formData);
    alert("Your enquiry has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contact Eventmate</h1>
        <p className="contact-text">
          If you have any enquiries, want to report missing hall images, or need assistance, please fill out the form below and our support team will get back to you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactEventmate;
