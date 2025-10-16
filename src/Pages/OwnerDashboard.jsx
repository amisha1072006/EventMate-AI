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
          <li><Link to="/owner/manage-halls">Manage Halls</Link></li>
          <li><Link to="/owner/bookings">Bookings</Link></li>
          <li><Link to="/owner/profile">Profile</Link></li>
        </ul>

        {/* Logout Button */}
        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="dashboard-content">
        <div className="dashboard-topbar">
          <h3>Welcome, Owner</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default OwnerDashboardLayout;






















// import React from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useOwnerAuth } from '../Context/OwnerAuthContext';

// const OwnerDashboardLayout = () => {
//   const { logoutOwner } = useOwnerAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logoutOwner();
//     navigate('/login-owner');
//   };

//   // --- Inline Styling ---
//   const containerStyles = {
//     display: 'flex',
//     minHeight: '100vh',
//     backgroundColor: '#f4f4f4',
//   };
//   const sidebarStyles = {
//     width: '220px',
//     backgroundColor: '#080808',
//     color: '#fff',
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   };
//   const linkStyles = {
//     color: '#fff',
//     textDecoration: 'none',
//     margin: '10px 0',
//     fontSize: '16px',
//     fontWeight: 'bold',
//   };
//   const mainContentStyles = {
//     flex: 1,
//     padding: '30px',
//   };
//   const topBarStyles = {
//     backgroundColor: '#ffffff',
//     padding: '10px 20px',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     marginBottom: '20px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };
//   const buttonStyles = {
//     padding: '8px 16px',
//     backgroundColor: '#d9534f',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   };

//   return (
//     <div style={containerStyles}>
//       <div style={sidebarStyles}>
//         <div>
//           <h2> Dashboard</h2>
//           <Link to="manage-halls" style={linkStyles}>Manage Halls</Link>
//           <Link to="bookings" style={linkStyles}>Bookings</Link>
//           <Link to="profile" style={linkStyles}>Profile</Link>
//         </div>
//         <button style={buttonStyles} onClick={handleLogout}>Logout</button>
//       </div>
//       <div style={mainContentStyles}>
//         <div style={topBarStyles}>
//           <h3>Welcome, Owner</h3>
//         </div>
//         {/* Render the selected route */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboardLayout;


