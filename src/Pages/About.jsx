// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const About = () => {
//   const navigate =  useNavigate()

//   const goToHome = () =>{
//     navigate('/');
//   }

//   const goBack = () =>{
//     navigate(-1)
//   }

  
//   return (
//        <>
//           <h1>About Page</h1>
//           <button onClick={goToHome}>Go to Home</button>
//           <button onClick={goBack}>Go Back</button>
//        </>
//   )
// }

// export default About


import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center px-6 md:px-20 py-12">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center font-serif">
        About Us
      </h1>

      {/* Introduction */}
      <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-10 text-center font-sans">
        Welcome to our platform! We are dedicated to providing seamless booking 
        experiences and exceptional management services. Our goal is to make 
        every interaction smooth, reliable, and enjoyable for our users.
      </p>

      {/* Our Bookings */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-serif">
          Our Bookings
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed font-sans">
          Our booking system is designed to be simple and efficient. Whether 
          it's reserving services, scheduling appointments, or managing events, 
          we ensure every booking is processed smoothly and accurately, giving 
          our users peace of mind and convenience.
        </p>
      </div>

      {/* Management */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-serif">
          Management
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed font-sans">
          Our management team is committed to excellence and transparency. 
          With organized processes, clear communication, and a focus on user 
          satisfaction, we ensure that all operations run seamlessly, delivering 
          high-quality service every time.
        </p>
      </div>

      {/* Navigation to Contact */}
      <div className="text-center mt-6">
        <p className="text-gray-700 text-lg mb-4">
          Have any questions or need help?
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default About;
