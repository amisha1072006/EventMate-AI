import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-[#67d7e8] h-[50px] px-6">
      {/* Left Side */}
      <Link to="/" className="font-bold text-black no-underline px-4">
        Eventmate AI
      </Link>

      {/* Right Side */}
      <div className="flex space-x-6">
        <Link to="/about" className="font-bold text-black no-underline px-4">
          About
        </Link>
        <Link to="/contact" className="font-bold text-black no-underline px-4">
          Contact
        </Link>
        <Link to="/Login" className="font-bold text-black no-underline px-4">
          Login
        </Link>
        <Link to="/Signup" className="font-bold text-black no-underline px-4">
         SignUp
        </Link>
      </div>
    </div>
  )
}

export default Navbar
