import React from 'react'
import './bookingpage.css'
import { Link } from 'react-router-dom'
const BookingPage = () => {
  return (
   <>
        <div className="header">
            <h1 className="text-3xl font-extrabold  ">
              Eventmate AI  
            </h1> 
            <h3 className="font-extrabold   ">
            Plan Schedule and Manage Your Events Seamlessly with Eventmate AI
            </h3>
       </div>
       <div className="sidebarul">
       <Link className="sidebar-items" to={'/FindHall'}>Find Halls</Link>
       <Link className="sidebar-items" to={'/AddBooking'}>Add Booking</Link>
       <Link className="sidebar-items" to={'/ApproveBookings'}>Approve bookings</Link>
       <Link className="sidebar-items" to={'/ManageBookings'}>Manage Bookings</Link>
       </div>

   </>
  )
}

export default BookingPage