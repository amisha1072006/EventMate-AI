
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './Context/AuthContext'; 

// Authentication Components
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/Signup.jsx';
import ResetPassOtp from './Authentication/ResetPassOtp.jsx';
import EmailOtp from './Authentication/EmailOtp.jsx';
import ForgotPass from './Authentication/ForgotPass.jsx';

// Core Components
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrendingVenues from './components/TrendingVenues.jsx';
import Categories from './components/Categories.jsx';
import Recommendations from './components/Recommendations.jsx';
import Footer from './components/Footer.jsx';
import AIAssistant from './components/AIAssistant.jsx';

// HallBooking Components
import CheckAvailabilityForm from './HallBooking/CheckAvailabilityForm.jsx';
import DateTimeRangeReactDatePicker from './HallBooking/DateTimeRangeReactDatepicker.jsx';
import HallBookingForm from './HallBooking/HallBookingForm.jsx';
import SuccessMsg from './HallBooking/SuccessMsg.jsx';

// HallPages Components
import FindHall from './HallPages/FindHall.jsx';

// General Pages
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import VenueDetails from './Pages/VenueDetails.jsx';

// --- Private Route Component ---
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// --- Conditional Header/Footer ---
const ConditionalHeader = () => {
  const location = useLocation();
  const hideOnPages = []; 
  if (hideOnPages.includes(location.pathname)) return null;
  return <Header />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const hideOnPages = ['/forgot-password', '/ResetPassOtp', '/EmailOtp', '/login', '/signup'];
  if (hideOnPages.includes(location.pathname)) return null;
  return <Footer />;
};

// --- App Routes ---
const AppRoutes = () => {
  return (
    <div className="app-container">
      <ConditionalHeader />

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Hero /><TrendingVenues /><Categories /><Recommendations /></>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/ResetPassOtp" element={<ResetPassOtp />} />
          <Route path="/EmailOtp" element={<EmailOtp />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/venue/:venueId" element={<VenueDetails />} />

          {/* Private Routes */}
          <Route path="/FindHall" element={<PrivateRoute><FindHall /></PrivateRoute>} />
          <Route path="/CheckAvailabilityForm" element={<PrivateRoute><CheckAvailabilityForm /></PrivateRoute>} />
          <Route path="/HallBookingForm" element={<PrivateRoute><HallBookingForm /></PrivateRoute>} />
          <Route path="/SuccessMsg" element={<PrivateRoute><SuccessMsg /></PrivateRoute>} />
          <Route path="/DateTimeRangeReactDatePicker" element={<PrivateRoute><DateTimeRangeReactDatePicker /></PrivateRoute>} />
        </Routes>
      </main>

      <ConditionalFooter />
    </div>
  );
};

// --- Main App ---
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        {/* Render AI Assistant once at the bottom */}
        <AIAssistant />
      </Router>
    </AuthProvider>
  );
}

export default App;
