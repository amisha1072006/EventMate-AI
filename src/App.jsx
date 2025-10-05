// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import './App.css';
// import { AuthProvider, useAuth } from './Context/AuthContext'; 
// import UserNavbar from './components/UserNavbar';
// import Navbar from './components/Navbar.jsx';

// // Authentication Components
// import Login from './Authentication/Login.jsx';
// import Signup from './Authentication/Signup.jsx';
// import ResetPassOtp from './Authentication/ResetPassOtp.jsx';
// import EmailOtp from './Authentication/EmailOtp.jsx';
// import ForgotPass from './Authentication/ForgotPass.jsx';

// // Core Components
// import Hero from './components/Hero.jsx';
// import TrendingVenues from './components/TrendingVenues.jsx';
// import Categories from './components/Categories.jsx';
// import Recommendations from './components/Recommendations.jsx';
// import Footer from './components/Footer.jsx';
// import AIAssistant from './components/AIAssistant.jsx';

// // HallBooking Components
// import CheckAvailabilityForm from './HallBooking/CheckAvailabilityForm.jsx';
// import DateTimeRangeReactDatePicker from './HallBooking/DateTimeRangeReactDatepicker.jsx';
// import HallBookingForm from './HallBooking/HallBookingForm.jsx';
// import SuccessMsg from './HallBooking/SuccessMsg.jsx';

// // HallPages Components
// import FindHall from './HallPages/FindHall.jsx';

// // General Pages
// import About from './Pages/About.jsx';
// import Contact from './Pages/Contact.jsx';
// import VenueDetails from './Pages/VenueDetails.jsx';

// // --- Private Route Component ---
// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// };

// // --- Conditional Header/Footer ---
// const ConditionalHeader = () => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <UserNavbar /> : <Navbar />;
// };

// const ConditionalFooter = () => {
//   const location = useLocation();
//   const hideOnPages = ['/forgot-password', '/resetpassotp', '/emailotp', '/login', '/signup'];
//   if (hideOnPages.includes(location.pathname.toLowerCase())) return null;
//   return <Footer />;
// };

// // --- App Routes ---
// const AppRoutes = () => {
//   return (
//     <div className="app-container">
//       <ConditionalHeader />

//       <main>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<><Hero /><TrendingVenues /><Categories /><Recommendations /></>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPass />} />
//           <Route path="/resetpassotp" element={<ResetPassOtp />} />
//           <Route path="/emailotp" element={<EmailOtp />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/venue/:venueId" element={<VenueDetails />} />

//           {/* Private Routes */}
//           <Route path="/findhall" element={<PrivateRoute><FindHall /></PrivateRoute>} />
//           <Route path="/checkavailabilityform" element={<PrivateRoute><CheckAvailabilityForm /></PrivateRoute>} />
//           <Route path="/hallbookingform" element={<PrivateRoute><HallBookingForm /></PrivateRoute>} />
//           <Route path="/successmsg" element={<PrivateRoute><SuccessMsg /></PrivateRoute>} />
//           <Route path="/datetimerangereactdatepicker" element={<PrivateRoute><DateTimeRangeReactDatePicker /></PrivateRoute>} />
//         </Routes>
//       </main>

//       <ConditionalFooter />
//     </div>
//   );
// };

// // --- Main App ---
// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppRoutes />
//         <AIAssistant />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;





























import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './Context/AuthContext'; 
import UserNavbar from './components/UserNavbar';
import Navbar from './components/Navbar.jsx';

// Authentication Components
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/Signup.jsx';
import ResetPassOtp from './Authentication/ResetPassOtp.jsx';
import EmailOtp from './Authentication/EmailOtp.jsx';
import ForgotPass from './Authentication/ForgotPass.jsx';

// Core Components
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

// Dashboard Layout
import DashboardLayout from './Pages/DashboardLayout.jsx';
import Photographers from './Pages/Photographers.jsx';
import Planners from './Pages/Planners.jsx';
import Cakes from './Pages/Cakes.jsx';
import Attire from './Pages/Attire.jsx';
import Profilesettings from './Pages/Profilesettings.jsx';
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
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <UserNavbar /> : <Navbar />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const hideOnPages = ['/forgot-password', '/resetpassotp', '/emailotp', '/login', '/signup'];
  if (hideOnPages.includes(location.pathname.toLowerCase())) return null;
  return <Footer />;
};

// --- Authenticated Dashboard Section ---
const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/findhall" element={<FindHall />} />
        <Route path="/checkavailabilityform" element={<CheckAvailabilityForm />} />
        <Route path="/hallbookingform" element={<HallBookingForm />} />
        <Route path="/successmsg" element={<SuccessMsg />} />
        <Route path="/datetimerangereactdatepicker" element={<DateTimeRangeReactDatePicker />} />
         <Route path="/photographers" element={<Photographers />} />
         <Route path="/planners" element={<Planners />} />
         <Route path="/cakes" element={<Cakes />} />
         <Route path="/attire" element={<Attire />} />
         <Route path="/profilesettings" element={<Profilesettings />} />
      </Routes>
    </DashboardLayout>
  );
};

// --- App Routes ---
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-container">
      <ConditionalHeader />

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Hero /><TrendingVenues /><Categories /><Recommendations /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/resetpassotp" element={<ResetPassOtp />} />
          <Route path="/emailotp" element={<EmailOtp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/venue/:venueId" element={<VenueDetails />} />

          {/* Private Dashboard Layout */}
          {isAuthenticated && (
            <Route path="/*" element={<PrivateRoute><DashboardRoutes /></PrivateRoute>} />
          )}
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
        <AIAssistant />
      </Router>
    </AuthProvider>
  );
}

export default App;
