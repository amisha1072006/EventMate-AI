//import React from "react";
import React, { useState } from "react";
import './OMH.css';

const OwnerManageHalls = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    hallName: "",
    hallAddress: "",
    hallDescription: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    imageUrl4: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Hall details submitted successfully!");
  };

  return (
    <div className="manage-halls-container">
      <h2 className="page-title">Manage Halls</h2>
      <p className="page-subtitle">
        Add your hall details below. The first image URL is mandatory.
      </p>

      <form className="hall-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Enter owner name"
            required
          />
        </div>

        <div className="form-group">
          <label>Hall Name</label>
          <input
            type="text"
            name="hallName"
            value={formData.hallName}
            onChange={handleChange}
            placeholder="Enter hall name"
            required
          />
        </div>

        <div className="form-group">
          <label>Hall Address</label>
          <textarea
            name="hallAddress"
            value={formData.hallAddress}
            onChange={handleChange}
            placeholder="Enter full address"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Hall Description</label>
          <textarea
            name="hallDescription"
            value={formData.hallDescription}
            onChange={handleChange}
            placeholder="Write a short description of the hall"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL 1 (Mandatory)</label>
          <input
            type="url"
            name="imageUrl1"
            value={formData.imageUrl1}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL 2</label>
          <input
            type="url"
            name="imageUrl2"
            value={formData.imageUrl2}
            onChange={handleChange}
            placeholder="https://example.com/image2.jpg"
          />
        </div>

        <div className="form-group">
          <label>Image URL 3</label>
          <input
            type="url"
            name="imageUrl3"
            value={formData.imageUrl3}
            onChange={handleChange}
            placeholder="https://example.com/image3.jpg"
          />
        </div>

        <div className="form-group">
          <label>Image URL 4</label>
          <input
            type="url"
            name="imageUrl4"
            value={formData.imageUrl4}
            onChange={handleChange}
            placeholder="https://example.com/image4.jpg"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Hall Details
        </button>
      </form>
    </div>
  );
};

export default OwnerManageHalls;
