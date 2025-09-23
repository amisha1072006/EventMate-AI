import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// ✨ Step 1: Authentication Context ko import karein
// Ye file aapko 'src/context/AuthContext.js' mein banani hogi
import { AuthProvider, useAuth } from './Context/AuthContext'; 

// --- Aapke Saare Component Imports (A to Z) ---

// Authentication Components
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/Signup.jsx';
import ResetPassOtp from './Authentication/ResetPassOtp.jsx';
import EmailOtp from './Authentication/EmailOtp.jsx';
import ForgotPass from './Authentication/ForgotPass.jsx';

// Core Components
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
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

// ✨ Step 2: Private Route Component
// Ye component check karta hai ki user login hai ya nahi
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Agar user login nahi hai, to use login page par bhej do
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// --- Conditional Components (Header aur Footer ko chupane ke liye) ---

const ConditionalHeader = () => {
  const location = useLocation();
  // In pages par Header nahi dikhega
  const hideOnPages = [''];
  if (hideOnPages.includes(location.pathname)) {
    return null; 
  }
  return <Header />;
};

const ConditionalFooter = () => {
    const location = useLocation();
    // In pages par Footer nahi dikhega
    const hideOnPages = ['/forgot-password', '/ResetPassOtp', '/EmailOtp', '/login', '/signup']; // <-- Yahaan badlav kiya hai
    if (hideOnPages.includes(location.pathname)) {
      return null; 
    }
    return <Footer />;
};


// ✨ Step 3: Saare Routes ko ek jagah manage karein
function AppRoutes() {
  return (
    <div className="app-container">
      <ConditionalHeader />
      <main>
        <Routes>
          {/* --- Public Routes (Ye routes sabko dikhenge) --- */}
          <Route path="/" element={
            <>
              <Hero />
              <AIAssistant />
              <TrendingVenues />
              <Categories />
              <Recommendations />
              <Header />
              <Footer />
              <Navbar />
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


          {/* --- Private Routes (Ye sirf login ke baad dikhenge) --- */}
          
          {/* Dashboard and Admin */}

          {/* Hall Pages */}
          <Route path="/FindHall" element={<PrivateRoute><FindHall /></PrivateRoute>} />

          {/* Hall Booking Process */}
          <Route path="/CheckAvailabilityForm" element={<PrivateRoute><CheckAvailabilityForm /></PrivateRoute>} />
          <Route path="/HallBookingForm" element={<PrivateRoute><HallBookingForm /></PrivateRoute>} />
          <Route path="/SuccessMsg" element={<PrivateRoute><SuccessMsg /></PrivateRoute>} />
          <Route path="/DateTimeRangeReactDatePicker" element={<PrivateRoute><DateTimeRangeReactDatePicker /></PrivateRoute>} />
          
        </Routes>
      </main>
      <ConditionalFooter />
    </div>
  );
}

// ✨ Step 4: Main App component poori application ko AuthProvider se wrap karega
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