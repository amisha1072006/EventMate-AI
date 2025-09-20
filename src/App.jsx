import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Team from './Pages/Team'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import Course_Details from './Pages/Course_Details'
import Navbar from './components/Navbar'
import MainAdmin from './Pages/MainAdmin'
import Dashboard from './Pages/Dashboard'
import EmailOtp from './Authentication/EmailOtp'
import FindHall from './HallPages/FindHall'


import DateTimeRangeReactDatepicker from './HallBooking/DateTimeRangeReactDatepicker'
import CheckAvailabilityForm from './HallBooking/CheckAvailabilityForm'
import HallBookingForm from './HallBooking/HallBookingForm'
import EventPage from './HallBooking/EventPage' 
import SuccessMsg from './HallBooking/SuccessMsg'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import ForgotPass from './Authentication/ForgotPass'
import ResetPassOtp from './Authentication/ResetPassOtp'

// import CheckAvailabilityForm from './HallPages/CheckAvailabilityForm'
// import HallBookingForm from './HallPages/HallBookingForm'



const App = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Team' element={<Team />} />
        <Route path='/Product' element={<Product />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Courses' element={<Product />} />
        <Route path='/Courses/:id' element={<Course_Details />} />
        <Route path='/MainAdmin' element={<MainAdmin />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/EmailOtp' element={<EmailOtp/>} />
        <Route path='/FindHall' element={<FindHall/>}/>
        <Route path='Login' element={<Login />} />
        <Route path='Signup' element={<Signup />} />  
        <Route path='ForgotPass' element={<ForgotPass/>} />
        <Route path='ResetPassOtp' element={<ResetPassOtp/>} />
        
         {/* Hall bookibg routesss */}

        <Route path='/EventPage' element={<EventPage/>}/>
        <Route path='/DateTimeRangeReactDatepicker' element={<DateTimeRangeReactDatepicker/>}     />   
        <Route path='/CheckAvailabilityForm' element={<CheckAvailabilityForm/>}/>
        <Route path='/HallBookingForm' element={<HallBookingForm/>}/>
        <Route path='/SuccessMsg' element={<SuccessMsg />} />  
      </Routes>
    </Router>
  )
}

 
const ConditionalNavbar = () => {
  const location = useLocation()

 
  const hideNavbarRoutes = ['/MainAdmin', '/Dashboard', '/EmailOtp', '/FindHall']

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null
  }

  return <Navbar />
}

export default App
