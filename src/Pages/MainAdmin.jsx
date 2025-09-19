import React from "react";
import { useNavigate } from "react-router-dom";

const MainAdmin = () => {
  const navigate = useNavigate();

  // const goToAdmin = (e) => {
  //   e.preventDefault();  
  //   navigate("/Dashboard");
  // };


  const goToEmailOtp = (e) => {
    e.preventDefault();  
    navigate("/EmailOtp");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed bg-gradient-to-r from-[#faf3e0] to-[#c5a45a]"
       
    >
      <div className="bg-white w-[500px] p-8  rounded-xl shadow-lg text-center">
 
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Admin Login
        </h2>

        <form >
      
          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          
          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="email"
              placeholder="Enter your Mobile Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
 
          <div className="mb-6 text-left">
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

  
          <button
          onClick={goToEmailOtp}
            type="submit"
            className="w-full py-2 bg-[#d4af37] hover:bg-[#d4af37]
             text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Login 
          </button>

   
          {/* <button
          onClick={goToAdmin}
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Login For Admin Dashboard
          </button> */}

        </form>
      </div>
    </div>
  );
};

export default MainAdmin;
