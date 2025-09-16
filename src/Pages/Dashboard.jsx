import React from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css'
import BookingPage from "../HallPages/BookingPage";


const MainAdmin = () => {
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate("/");
  };

  return (
    <>
       <BookingPage/>
     

    
  
      </>
 
  );
};

export default MainAdmin;
