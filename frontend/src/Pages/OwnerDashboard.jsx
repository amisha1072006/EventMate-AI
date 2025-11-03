import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOwnerAuth } from "../Context/OwnerAuthContext"; // Using Owner Auth Context
import "./OwnerDashboard.css"; // External CSS file

const OwnerDashboardLayout = ({ children }) => {
  const { logoutOwner } = useOwnerAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutOwner();
    navigate("/login-owner");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-title">Dashboard</h2>
        <ul className="dashboard-menu">
          <li><Link to="/owner/manage-halls">Add Halls</Link></li>
          <li><Link to="/owner/manage-halls-info">Why Add Halls?</Link></li>
          <li><Link to="/owner/bookings">Bookings</Link></li>
          <li><Link to="/owner/contact-eventmate">Contact Eventmate</Link></li>
          {/* <li><Link to="/owner/profile">Profile</Link></li> */}
        </ul>

        {/* Logout Button
        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button> */}
      </aside>

      {/* Main content */}
      <div className="dashboard-content">
        {/* <div className="dashboard-topbar">
          <h3>Welcome, Owner</h3>
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default OwnerDashboardLayout;



















