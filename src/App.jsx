
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import BookingSuggestions from './HallBooking/BookingSuggestions.jsx';

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
import PhotographerDetails from './Pages/PhotographerDetails.jsx';
import PhotographerSuggestion from './Pages/PhotographerSuggestion.jsx';
import Planners from './Pages/Planners.jsx';
import PlannerDetails from './Pages/PlannerDetails.jsx';
import Cakes from './Pages/Cakes.jsx';
import Attire from './Pages/Attire.jsx';
import Profilesettings from './Pages/Profilesettings.jsx';

import OwnerNavbar from './components/OwnerNavbar.jsx';
import OwnerDashboardLayout from './Pages/OwnerDashboard.jsx';
import OwnerManageHalls from './Pages/OwnerManageHalls.jsx';
import OwnerBookings from './Pages/OwnerBookings.jsx';
import OwnerProfile from './Pages/OwnerProfile.jsx';

// ✅ Private Route for Users
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
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

  if (isOwnerAuthenticated) return <OwnerNavbar />; // you can replace with <OwnerNavbar /> if you create a separate one
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
const DashboardRoutes = () => (
  <DashboardLayout>
    <Routes>
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/findhall" element={<FindHall />} />
      <Route path="/checkavailabilityform" element={<CheckAvailabilityForm />} />
      <Route path="/hallbookingform" element={<HallBookingForm />} />
       <Route path="/booking-suggestions" element={<BookingSuggestions />} />
      <Route path="/successmsg" element={<SuccessMsg />} />
      <Route path="/datetimerangereactdatepicker" element={<DateTimeRangeReactDatePicker />} />
      {/* <Route path="/photographers" element={<Photographers />} />
      <Route path="/planners" element={<Planners />} /> */}

         <Route path="/photographers" element={<Photographers />} />
         <Route path="/photographer/:id" element={<PhotographerDetails />} />
        <Route path="/photographer-suggestion" element={<PhotographerSuggestion/>} />

         <Route path="/planners" element={<Planners />} />
         <Route path="/planner/:id" element={<PlannerDetails />} />   

      <Route path="/cakes" element={<Cakes />} />
      <Route path="/attire" element={<Attire />} />
      <Route path="/profilesettings" element={<Profilesettings />} />
    </Routes>
  </DashboardLayout>
);
//owner dashboard routes
const OwnerDashboardRoutes = () =>(
  <OwnerDashboardLayout>
    <Routes>
      <Route path="/owner/manage-halls" element={<OwnerManageHalls />}/>
      <Route path="/owner/bookings" element={<OwnerBookings />}/>
      <Route path="/owner/profile" element={<OwnerProfile />}/>
    </Routes>
  </OwnerDashboardLayout>
);

// ✅ App Routes (All)
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

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
           
          {/* User Dashboard */}
          {isAuthenticated && (
            <Route path="/*" element={<PrivateRoute><DashboardRoutes /></PrivateRoute>} />
          )}

          {/* Owner Dashboard */}
          <Route
            path="/*"
            element={<PrivateOwnerRoute><OwnerDashboardRoutes /></PrivateOwnerRoute>}
          />
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




































// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// // // import './App.css';
// // // import { AuthProvider, useAuth } from './Context/AuthContext'; 
// // // import UserNavbar from './components/UserNavbar';
// // // import Navbar from './components/Navbar.jsx';

// // // // Authentication Components
// // // import Login from './Authentication/Login.jsx';
// // // import Signup from './Authentication/Signup.jsx';
// // // import ResetPassOtp from './Authentication/ResetPassOtp.jsx';
// // // import EmailOtp from './Authentication/EmailOtp.jsx';
// // // import ForgotPass from './Authentication/ForgotPass.jsx';

// // // // Core Components
// // // import Hero from './components/Hero.jsx';
// // // import TrendingVenues from './components/TrendingVenues.jsx';
// // // import Categories from './components/Categories.jsx';
// // // import Recommendations from './components/Recommendations.jsx';
// // // import Footer from './components/Footer.jsx';
// // // import AIAssistant from './components/AIAssistant.jsx';

// // // // HallBooking Components
// // // import CheckAvailabilityForm from './HallBooking/CheckAvailabilityForm.jsx';
// // // import DateTimeRangeReactDatePicker from './HallBooking/DateTimeRangeReactDatepicker.jsx';
// // // import HallBookingForm from './HallBooking/HallBookingForm.jsx';
// // // import SuccessMsg from './HallBooking/SuccessMsg.jsx';

// // // // HallPages Components
// // // import FindHall from './HallPages/FindHall.jsx';

// // // // Dashboard Layout
// // // import DashboardLayout from './Pages/DashboardLayout.jsx';
// // // import Photographers from './Pages/Photographers.jsx';
// // // import Planners from './Pages/Planners.jsx';
// // // import Cakes from './Pages/Cakes.jsx';
// // // import Attire from './Pages/Attire.jsx';
// // // import Profilesettings from './Pages/Profilesettings.jsx';
// // // // General Pages
// // // import About from './Pages/About.jsx';
// // // import Contact from './Pages/Contact.jsx';
// // // import VenueDetails from './Pages/VenueDetails.jsx';
// // // import Bookings from './Pages/Bookings.jsx';
// // // import SignupOwner from './Authentication/SignupOwner.jsx';
// // // import LoginOwner from './Authentication/LoginOwner.jsx';
// // // // --- Private Route Component ---
// // // const PrivateRoute = ({ children }) => {
// // //   const { isAuthenticated } = useAuth();
// // //   const location = useLocation();
// // //   if (!isAuthenticated) {
// // //     return <Navigate to="/login" state={{ from: location }} replace />;
// // //   }
// // //   return children;
// // // };

// // // // --- Conditional Header/Footer ---
// // // const ConditionalHeader = () => {
// // //   const { isAuthenticated } = useAuth();
// // //   return isAuthenticated ? <UserNavbar /> : <Navbar />;
// // // };

// // // const ConditionalFooter = () => {
// // //   const location = useLocation();
// // //   const hideOnPages = ['/forgot-password', '/resetpassotp', '/emailotp', '/login', '/signup','/login-owner','/signup-owner'];
// // //   if (hideOnPages.includes(location.pathname.toLowerCase())) return null;
// // //   return <Footer />;
// // // };

// // // // --- Authenticated Dashboard Section ---
// // // const DashboardRoutes = () => {
// // //   return (
// // //     <DashboardLayout>
// // //       <Routes>
// // //         <Route path="/bookings" element={<Bookings />} />
// // //         <Route path="/findhall" element={<FindHall />} />
// // //         <Route path="/checkavailabilityform" element={<CheckAvailabilityForm />} />
// // //         <Route path="/hallbookingform" element={<HallBookingForm />} />
// // //         <Route path="/successmsg" element={<SuccessMsg />} />
// // //         <Route path="/datetimerangereactdatepicker" element={<DateTimeRangeReactDatePicker />} />
// // //          <Route path="/photographers" element={<Photographers />} />
// // //          <Route path="/planners" element={<Planners />} />
// // //          <Route path="/cakes" element={<Cakes />} />
// // //          <Route path="/attire" element={<Attire />} />
// // //          <Route path="/profilesettings" element={<Profilesettings />} />
// // //       </Routes>
// // //     </DashboardLayout>
// // //   );
// // // };

// // // // --- App Routes ---
// // // const AppRoutes = () => {
// // //   const { isAuthenticated } = useAuth();

// // //   return (
// // //     <div className="app-container">
// // //       <ConditionalHeader />

// // //       <main>
// // //         <Routes>
// // //           {/* Public Routes */}
// // //           <Route path="/" element={<><Hero /><TrendingVenues /><Categories /><Recommendations /></>} />
// // //           <Route path="/login" element={<Login />} />
// // //           <Route path="/login-owner" element={<LoginOwner />} />
// // //           <Route path="/signup" element={<Signup />} />
// // //           <Route path="/signup-owner" element={<SignupOwner />} />
// // //           <Route path="/forgot-password" element={<ForgotPass />} />
// // //           <Route path="/resetpassotp" element={<ResetPassOtp />} />
// // //           <Route path="/emailotp" element={<EmailOtp />} />
// // //           <Route path="/about" element={<About />} />
// // //           <Route path="/contact" element={<Contact />} />
// // //           <Route path="/venue/:venueId" element={<VenueDetails />} />

// // //           {/* Private Dashboard Layout */}
// // //           {isAuthenticated && (
// // //             <Route path="/*" element={<PrivateRoute><DashboardRoutes /></PrivateRoute>} />
// // //           )}
// // //         </Routes>
// // //       </main>

// // //       <ConditionalFooter />
// // //     </div>
// // //   );
// // // };

// // // // --- Main App ---
// // // function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <Router>
// // //         <AppRoutes />
// // //         <AIAssistant />
// // //       </Router>
// // //     </AuthProvider>
// // //   );
// // // }

// // // export default App;


