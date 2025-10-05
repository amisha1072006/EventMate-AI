import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-title">Dashboard</h2>
        <ul className="dashboard-menu">
          <li><Link to="/findHall">Find Hall</Link></li>
           <li><Link to="/photographers">Photographers</Link></li>
           <li><Link to="/planners">Planners</Link></li>
           <li><Link to="/cakes">Cakes</Link></li>
           <li><Link to="/attire">Attire</Link></li>
           <li><Link to="/profilesettings">Profile Settings</Link></li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
