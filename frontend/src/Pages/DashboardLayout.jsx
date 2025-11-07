import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Dashboard.css";

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Hide sidebar for specific pages
  const hideSidebar =
    location.pathname.startsWith("/halls") ||
    location.pathname.startsWith("/hallbookingform") ||
    location.pathname.startsWith("/checkavailabilityform") ||
    location.pathname.startsWith("/booking-suggestions") ||
    location.pathname.startsWith("/successmsg") ||
    location.pathname.startsWith("/recommendationPages") ||
    // ✅ Added new pages where sidebar should be hidden
    location.pathname === "/modern" ||
    location.pathname === "/grand" ||
    location.pathname === "/elegant" ||
    location.pathname === "/planning";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar — hidden on specific pages */}
      {!hideSidebar && (
        <aside className="dashboard-sidebar">
          <h2 className="dashboard-title">Dashboard</h2>
          <ul className="dashboard-menu">
            <li><Link to="/findhall">Find Hall</Link></li>
            <li><Link to="/halls">Halls by Owners</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/photographers">Photographers</Link></li>
            <li><Link to="/planners">Planners</Link></li>
            <li><Link to="/cakes">Cakes</Link></li>
            <li><Link to="/attire">Attire</Link></li>
            {/* <li><Link to="/profilesettings">Profile Settings</Link></li> */}
          </ul>

          {/* Optional Logout Button */}
          {/* <button
            className="logout-btn"
            onClick={handleLogout}
            style={{
              marginTop: "auto",
              padding: "10px 20px",
              backgroundColor: "#e63946",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "80%",
              alignSelf: "center",
              fontWeight: "500",
            }}
          >
            Logout
          </button> */}
        </aside>
      )}

      {/* Main Content */}
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
