import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// ✨ Authentication Context (koi badlav nahi)
import { AuthProvider, useAuth } from './Context/AuthContext'; 

// --- Aapke Saare Component Imports (A to Z) ---
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/Signup.jsx';
import ResetPassOtp from './Authentication/ResetPassOtp.jsx';
import EmailOtp from './Authentication/EmailOtp.jsx';
import ForgotPass from './Authentication/ForgotPass.jsx';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import TrendingVenues from './components/TrendingVenues.jsx';
import Categories from './components/Categories.jsx';
import Recommendations from './components/Recommendations.jsx';
import Footer from './components/Footer.jsx';
import AIAssistant from './components/AIAssistant.jsx';

// ✨ AIChatbot component ko import karein (koi badlav nahi)
import AIChatbot from './components/AIChatbot.jsx'; 

import CheckAvailabilityForm from './HallBooking/CheckAvailabilityForm.jsx';
import DateTimeRangeReactDatePicker from './HallBooking/DateTimeRangeReactDatepicker.jsx';
import HallBookingForm from './HallBooking/HallBookingForm.jsx';
import SuccessMsg from './HallBooking/SuccessMsg.jsx';

import FindHall from './HallPages/FindHall.jsx';

import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import VenueDetails from './Pages/VenueDetails.jsx';

// ✨ Private Route Component (koi badlav nahi)
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// --- Conditional Components (Header aur Footer ko chupane ke liye) ---
const ConditionalHeader = () => {
  const location = useLocation();
  // ✨ Change: '/ai-assistant' route par header ko hide karein
  const hideOnPages = ['/Login', '/Signup', '/forgot-password', '/ResetPassOtp', '/EmailOtp', '/ai-assistant'];
  if (hideOnPages.includes(location.pathname)) {
    return null; 
  }
  return <Header />;
};

const ConditionalFooter = () => {
    const location = useLocation();
    // ✨ Change: '/ai-assistant' route par footer ko hide karein
    const hideOnPages = ['/forgot-password', '/ResetPassOtp', '/EmailOtp', '/login', '/signup', '/ai-assistant']; 
    if (hideOnPages.includes(location.pathname)) {
      return null; 
    }
    return <Footer />;
};

// --- Saare Routes ko ek jagah manage karein ---
function AppRoutes() {
  // ✨ Change: useState ko hata diya kyunki ab hum navigate hook ka istemal karenge
  // const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const navigate = useNavigate(); // ✨ Change: useNavigate hook ko import aur use kiya

  const handleOpenChatbot = () => {
    // ✨ Change: Ab button click par naye route ('/ai-assistant') par redirect karenge
    navigate('/ai-assistant');
  };
  
  // handleCloseChatbot ko bhi hata diya kyunki ab back button se kaam hoga

  return (
    <div className="app-container">
      <ConditionalHeader />
      <main>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={
            <>
              <Hero />
              {/* ✨ Change: onClick prop ko AIAssistant component mein pass karein */}
              <AIAssistant onClick={handleOpenChatbot} />
              <TrendingVenues />
              <Categories />
              <Recommendations />
            </>
          } />
          
          {/* Auth Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/ResetPassOtp" element={<ResetPassOtp />} />
          <Route path="/EmailOtp" element={<EmailOtp />} />

          {/* General Public Pages */}
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/venue/:venueId" element={<VenueDetails />} />
          
          {/* ✨ Change: AI Assistant ke liye ek naya aur poora route banaya */}
          <Route path="/ai-assistant" element={<AIChatbot onClose={() => navigate(-1)} />} />

          {/* --- Private Routes --- */}
          <Route path="/FindHall" element={<PrivateRoute><FindHall /></PrivateRoute>} />
          <Route path="/CheckAvailabilityForm" element={<PrivateRoute><CheckAvailabilityForm /></PrivateRoute>} />
          <Route path="/HallBookingForm" element={<PrivateRoute><HallBookingForm /></PrivateRoute>} />
          <Route path="/SuccessMsg" element={<PrivateRoute><SuccessMsg /></PrivateRoute>} />
          <Route path="/DateTimeRangeReactDatePicker" element={<PrivateRoute><DateTimeRangeReactDatePicker /></PrivateRoute>} />
        </Routes>
      </main>
      {/* ✨ Change: Ab yahan Chatbot modal render nahi hoga */}
      {/* {isChatbotOpen && <AIChatbot onClose={handleCloseChatbot} />} */}
      <ConditionalFooter />
    </div>
  );
}

// ✨ Main App component (koi badlav nahi)
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;