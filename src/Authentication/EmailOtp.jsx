import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainAdmin = () => {
  const navigate = useNavigate();

  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  useEffect(() => {
    if (emailVerified && mobileVerified) {
      // Add delay so user sees the "Verified" button state
      const timer = setTimeout(() => {
        navigate("/Dashboard");
      }, 1500); // 1.5 seconds delay

      return () => clearTimeout(timer); // cleanup
    }
  }, [emailVerified, mobileVerified, navigate]);

  const verifyEmail = (e) => {
    e.preventDefault();
    setEmailVerified(true);
  };

  const verifyMobile = (e) => {
    e.preventDefault();
    setMobileVerified(true);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed bg-gradient-to-r from-[#faf3e0] to-[#c5a45a]"
      
    >
      <div className="bg-white p-8 w-[500px] rounded-xl shadow-lg text-center">
        <h2 className=" text-2xl font-semibold text-gray-800">
          Authentication Page
        </h2 >

        <h2  className="mb-6 font-semibold text-green-800">Enter Otp sent to your Email and Phone</h2>
        <form>
          {/* Email Verification */}
          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700">
              Email Verification
            </label>

    

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Email Otp"
                className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                disabled={emailVerified} // disable after verified
              />
              <button
                onClick={verifyEmail}
                type="submit"
                className={`px-4 py-2 ${
                  emailVerified
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-[#d4af37] hover:bg-[#d4af37]"
                } text-white font-semibold rounded-lg shadow-md transition duration-300`}
              >
                {emailVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>

          {/* Mobile Verification */}
          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700">
              Mobile Verification
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Mobile Otp"
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                disabled={mobileVerified} // disable after verified
              />
              <button
                onClick={verifyMobile}
                type="submit"
                className={`w-30 py-1.5 mt-0.5 ${
                  mobileVerified
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-[#d4af37] hover:bg-[#d4af37]"
                } text-white font-semibold rounded-lg shadow-md transition duration-300`}
              >
                {mobileVerified ? "Verified" : "Verify"}
              </button>
            </div>


          </div>
          
        </form>
      </div>
    </div>
  );
};

export default MainAdmin;
