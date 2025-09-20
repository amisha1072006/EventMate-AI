import React, { useState } from "react";
import emailjs from "emailjs-com";
import BookingPage from "../HallPages/BookingPage";
import { useNavigate } from "react-router-dom";

const HallBookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
  };

 const Navigate = useNavigate();
 const goToSuccessPage = () => {
  Navigate("/SuccessMsg");
 }; 



  return (
    <>
     <BookingPage/>

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          Hall Booking - User Info
        </h2>

        {/* Full Name */}
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          required
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          required
        />

        {/* Location */}
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 mb-6"
          required
        >
          <option value="">Select Location</option>
          <option value="chennai">Chennai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
          <option value="mumbai">Mumbai</option>
        </select>

        {/* Submit */}
        <button
        onClick={goToSuccessPage}
         
          className="w-full bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Next ➝
        </button>
      </form> 
    </div>  
       
    

    </>
  );
};

export default HallBookingForm;
