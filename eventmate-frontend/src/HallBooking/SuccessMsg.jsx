import React from 'react'
import { Link } from 'react-router-dom'

const SuccessMsg = () => {
  return (
    <>
      <BookingPage />

      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="shadow-2xl border-2 p-10 rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
            Booking Successful
          </h2>

          <Link
            to="/"
            className="w-full max-w-xs text-center bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg block"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </>
  )
}

export default SuccessMsg;
