import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import AuthContext
import "./Dashboard.css";

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth();  // Access logout function from context
  const navigate = useNavigate();

  const handleLogout1 = () => {
    logout();             // Clear user session
    navigate("/login");   // Redirect to login page
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
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

        {/* Logout button */}
        <button 
          className="logout-btn" 
          onClick={handleLogout1}
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
        </button>
      </aside>

      {/* Main content */}
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;






























// import React from "react";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";

// const DashboardLayout = ({ children }) => {
  
  
//   return (
//     <div className="dashboard-layout">
//       {/* Sidebar */}
//       <aside className="dashboard-sidebar">
//         <h2 className="dashboard-title">Dashboard</h2>
//         <ul className="dashboard-menu">
//           <li><Link to ="/bookings">Bookings</Link></li>
//           <li><Link to="/findHall">Find Hall</Link></li>
//            <li><Link to="/photographers">Photographers</Link></li>
//            <li><Link to="/planners">Planners</Link></li>
//            <li><Link to="/cakes">Cakes</Link></li>
//            <li><Link to="/attire">Attire</Link></li>
//            <li><Link to="/profilesettings">Profile Settings</Link></li>
           
//         </ul>
//       </aside>

//       {/* Main content */}
//       <div className="dashboard-content">
//         {children}
         
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;






