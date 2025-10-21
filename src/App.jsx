import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import BookingSuggestions from './HallBooking/BookingSuggestions.jsx'; // Sahi path daalein


// Contexts
import { AuthProvider, useAuth } from './Context/AuthContext';
import { OwnerAuthProvider, useOwnerAuth } from './Context/OwnerAuthContext';

// Common Components
import Navbar from './components/Navbar.jsx';
import UserNavbar from './components/UserNavbar';
import Footer from './components/Footer.jsx';
import AIAssistant from './components/AIAssistant.jsx';

// Authentication Components (User)
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/Signup.jsx';
import ForgotPass from './Authentication/ForgotPass.jsx';
import ResetPassOtp from './Authentication/ResetPassOtp.jsx';
import EmailOtp from './Authentication/EmailOtp.jsx';

// Authentication Components (Owner)
import SignupOwner from './Authentication/SignupOwner.jsx';
import LoginOwner from './Authentication/LoginOwner.jsx';
import OwnerEmailOtp from './Authentication/OwnerEmailOtp.jsx';

// Pages
import Hero from './components/Hero.jsx';
import TrendingVenues from './components/TrendingVenues.jsx';
import Categories from './components/Categories.jsx';
import Recommendations from './components/Recommendations.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import VenueDetails from './Pages/VenueDetails.jsx';

// Dashboard (User)
import DashboardLayout from './Pages/DashboardLayout.jsx';
import FindHall from './HallPages/FindHall.jsx';
import CheckAvailabilityForm from './HallBooking/CheckAvailabilityForm.jsx';
import DateTimeRangeReactDatePicker from './HallBooking/DateTimeRangeReactDatepicker.jsx';
import HallBookingForm from './HallBooking/HallBookingForm.jsx';
import SuccessMsg from './HallBooking/SuccessMsg.jsx';
import Bookings from './Pages/Bookings.jsx';
import Photographers from './Pages/Photographers.jsx';
import Planners from './Pages/Planners.jsx';
import Cakes from './Pages/Cakes.jsx';
import Attire from './Pages/Attire.jsx';
import Profilesettings from './Pages/Profilesettings.jsx';

// Dashboard (Owner)
import OwnerDashboard from './Pages/OwnerDashboard.jsx';
import OwnerNavbar from './components/OwnerNavbar.jsx';


// ✅ Private Route for Users
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    // Redirect unauthenticated users to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// ✅ Private Route for Owners
const PrivateOwnerRoute = ({ children }) => {
  const { isOwnerAuthenticated } = useOwnerAuth();
  const location = useLocation();
  if (!isOwnerAuthenticated) {
    return <Navigate to="/login-owner" state={{ from: location }} replace />;
  }
  return children;
};

// ✅ Conditional Navbar & Footer

const ConditionalHeader = () => {
  const { isAuthenticated } = useAuth();
  const { isOwnerAuthenticated } = useOwnerAuth();

  if (isOwnerAuthenticated) return <OwnerNavbar />; 
  if (isAuthenticated) return <UserNavbar />;
  return <Navbar />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const hideOnPages = [
    '/forgot-password',
    '/resetpassotp',
    '/emailotp',
    '/login',
    '/signup',
    '/login-owner',
    '/signup-owner',
    '/owner-email-otp'
  ];
  if (hideOnPages.includes(location.pathname.toLowerCase())) return null;
  return <Footer />;
};

// ✅ User Dashboard Routes
// Yeh routes ab /dashboard/* ke andar nest ho sakte hain (example ke liye)
// Ya fir aapke purane structure ke hisab se "/*" mein
const DashboardRoutes = () => (
  <DashboardLayout>
    <Routes>
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/findhall" element={<FindHall />} />
      <Route path="/checkavailabilityform" element={<CheckAvailabilityForm />} />
      <Route path="/hallbookingform" element={<HallBookingForm />} />
      <Route path="/booking-suggestions" element={<BookingSuggestions />} /> {/* <-- Naya route */}
      <Route path="/successmsg" element={<SuccessMsg />} />
      <Route path="/datetimerangereactdatepicker" element={<DateTimeRangeReactDatePicker />} />
      <Route path="/photographers" element={<Photographers />} />
      <Route path="/planners" element={<Planners />} />
      <Route path="/cakes" element={<Cakes />} />
      <Route path="/attire" element={<Attire />} />
      <Route path="/profilesettings" element={<Profilesettings />} />
      {/* Aap yahaan ek default dashboard route bhi add kar sakte hain, jaise:
      <Route index element={<Bookings />} /> 
      <Route path="/" element={<Navigate to="/bookings" replace />} /> 
      */}
    </Routes>
  </DashboardLayout>
);

// ✅ App Routes (All)
const AppRoutes = () => {
  // Yahaan 'isAuthenticated' ki zaroorat nahi hai
  // const { isAuthenticated } = useAuth(); 

  return (
    <div className="app-container">
      <ConditionalHeader />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Hero /><TrendingVenues /><Categories /><Recommendations /></>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/venue/:venueId" element={<VenueDetails />} />

          {/* User Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/resetpassotp" element={<ResetPassOtp />} />
          <Route path="/emailotp" element={<EmailOtp />} />

          {/* Owner Authentication */}
          <Route path="/login-owner" element={<LoginOwner />} />
          <Route path="/signup-owner" element={<SignupOwner />} />
          <Route path="/owner-email-otp" element={<OwnerEmailOtp />} />

          {/* --- === CORRECTED USER DASHBOARD ROUTING === --- */}
          {/* 'isAuthenticated' check ko yahaan se hata dein.
            'PrivateRoute' component yeh kaam khud karega.
            Agar user logged-in nahi hai, toh 'PrivateRoute' usse '/login' bhej dega.
          */}
          <Route 
            path="/*" 
            element={
              <PrivateRoute>
                <DashboardRoutes />
              </PrivateRoute>
            } 
          />
          {/* --- === --- */}


          {/* Owner Dashboard */}
          <Route
            path="/owner-dashboard" // Isse bhi /* kar sakte hain agar owner ke nested routes hain
            element={<PrivateOwnerRoute><OwnerDashboard /></PrivateOwnerRoute>}
          />

          {/* Optional: Ek 404 Not Found route add kar sakte hain */}
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}

        </Routes>
      </main>
      <ConditionalFooter />
    </div>
  );
};

// ✅ Final App
function App() {
  return (
    <AuthProvider>
      <OwnerAuthProvider>
        <Router>
          <AppRoutes />
          <AIAssistant />
        </Router>
      </OwnerAuthProvider>
    </AuthProvider>
  );
}

export default App;