import React, { useState } from "react";
//import "./OwnerProfile.css";

const OwnerProfile = () => {
  const [profile, setProfile] = useState({
    name: "Mr. Owner",
    email: "owner@example.com",
    phone: "123-456-7890",
    businessName: "Elite Events Co.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving profile
    alert("Profile updated successfully!");
    // Send to API in a real app
  };

  return (
    <div className="owner-profile">
      <h2>Profile Settings</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        </label>

        <label>
          Phone:
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
        </label>

        <label>
          Business Name:
          <input type="text" name="businessName" value={profile.businessName} onChange={handleChange} />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default OwnerProfile;
