import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const BookingPage = () => {
  return (
    <>
    <Navbar/>
     {/* header */}
      <div className="h-[70px] mt-12 flex fixed w-full flex-col justify-center items-center bg-sky-300">
        <h1 className="text-3xl font-extrabold">Eventmate AI</h1>
        <h3 className="font-extrabold text-center">
          Plan Schedule and Manage Your Events Seamlessly with Eventmate AI
        </h3>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col w-52 fixed mt-29 h-full overflow-auto bg-blue-200 ">
        <Link 
          className="bg-sky-300 mt-5 px-4 py-2 text-xl font-medium rounded-md hover:bg-sky-400 transition" 
          to="/FindHall"
        >
          Find Halls
        </Link>
        {/* <Link 
          className="bg-sky-300 mt-5 px-4 py-2 text-xl font-medium rounded-md hover:bg-sky-400 transition" 
          to="/AddBooking"
        >
          Add Booking
        </Link>
        <Link 
          className="bg-sky-300 mt-5 px-4 py-2 text-xl font-medium rounded-md hover:bg-sky-400 transition" 
          to="/ApproveBookings"
        >
          Approve Bookings
        </Link>
        <Link 
          className="bg-sky-300 mt-5 px-4 py-2 text-xl font-medium rounded-md hover:bg-sky-400 transition" 
          to="/ManageBookings"
        >
          Manage Bookings
        </Link> */}
      </div>
    </>
  )
}

export default BookingPage
