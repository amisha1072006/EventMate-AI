import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom"; // Hata diya gaya
// import { useAuth } from "../Context/AuthContext"; // Hata diya gaya
import "./Dashboard.css";

const DashboardLayout = ({ children }) => {
  // const { logout } = useAuth(); // Hata diya gaya
  // const navigate = useNavigate(); // Hata diya gaya

  // handleLogout function hata diya gaya hai
  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-title">Dashboard</h2>
        <ul className="dashboard-menu">
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/findhall">Find Hall</Link></li>
          <li><Link to="/photographers">Photographers</Link></li>
          <li><Link to="/planners">Planners</Link></li>
          <li><Link to="/cakes">Cakes</Link></li>
          <li><Link to="/attire">Attire</Link></li>
          <li><Link to="/profilesettings">Profile Settings</Link></li>
        </ul>

        {/* --- Logout button yahaan se hata diya gaya hai --- */}
        {/* <button 
          className="logout-btn" 
          onClick={handleLogout}
          ...
        >
          Logout
        </button> */}
      </aside>

      {/* Main content */}
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;