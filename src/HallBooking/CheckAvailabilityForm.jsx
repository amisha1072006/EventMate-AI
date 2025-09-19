import React from 'react'
import DateTimeRangeReactDatepicker from './DateTimeRangeReactDatepicker'; 
import BookingPage from '../HallPages/BookingPage';

const CheckAvailabilityForm = () => {
  return (
        <>

  <BookingPage/>
      
  <div className='min-h-screen flex items-center justify-center bg-gray-100 flex-wrap gap-25'>
         <div className='bg-white shadow-2xl rounded-2xl max-w-2xs text-center'>
        <img 
          className='w-[300px] h-[150px] rounded-t-2xl' 
          src="/images/1.png" 
          alt="Hall" 
        />
        <h2 className='text-2xl font-bold text-green-800 tracking-wide mb-0 mt-1'>Hall-1</h2>
        <DateTimeRangeReactDatepicker/>
      </div>
    </div>
        </>
  )
}

export default CheckAvailabilityForm