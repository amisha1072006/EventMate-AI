import React from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css'
import BookingPage from "../HallPages/BookingPage";
import EventPage from "../HallBooking/EventPage";


const MainAdmin = () => {
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate("/");
  };

  return (
    <>
        
       <BookingPage/>
       <EventPage/>

    
  
      </>
 
  );
};

export default MainAdmin;
