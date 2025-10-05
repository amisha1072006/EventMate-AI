import React from 'react';
import { useAuth } from '../Context/AuthContext';
import './Navbar.css'; // Reuse the same CSS

const UserNavbar = () => {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <div className="logo">Welcome to EventMate</div>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default UserNavbar;
