import React from "react";
import { useNavigate, Link } from "react-router-dom";

const ResetPassOtp = () => {
  const navigate = useNavigate();

  // const goToAdmin = (e) => {
  //   e.preventDefault();  
  //   navigate("/Dashboard");
  // };


//   const goToEmailOtp = (e) => {
//     e.preventDefault();  
//     navigate("/EmailOtp");
//   };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/adminlogin.jpg')" }}
    >
      <div className="bg-white w-[500px] p-8  rounded-xl shadow-lg text-center">
 
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
       Reset Password
        </h2>

        <form >
      
          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700">
             OTP
            </label>
            <input
              type="text"
              placeholder="Enter Otp Here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          
          
  

  
          <button
         
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
          Submit
          </button>

   
          {/* <button
          onClick={goToAdmin}
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Login For Admin Dashboard
          </button> */}

        </form>
{/* 
        
        <h2 className="mb-6 mt-2 text-left font-semibold text-gray-800">
          Already Have an Account : <Link className='text-blue-500 ml-3' to='/Signup'>SignUp</Link>
          <Link className='text-red-500 text-right ml-13' to='/Login'>Forgot Password</Link>
        </h2> */}
      </div>
    </div>
  );
};

export default ResetPassOtp;
