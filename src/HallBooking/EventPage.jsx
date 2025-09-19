import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
const [search, setSearch] = useState('');
const [eventType, setEventType] = useState('');
const [location, setLocation] = useState('');
const [foodPreference, setFoodPreference] = useState('');
const [capacity, setCapacity] = useState('');

const halls = [
  {
    id: 1,
    name: "Taj Palace",
    location: "chennai",
    eventType: "wedding",
    food: "vegetarian",
    capacity: "50",
  },
  {
    id: 2,
    name: "Rasana Garden",
    location: "delhi",
    eventType: "conference",
    food: "both",
    capacity: "80",
  },
  {
    id: 3,
    name: "Grand Venue",
    location: "chennai",
    eventType: "birthday",
    food: "non-vegetarian",
    capacity: "60",
  },
  {
    id: 4,
    name: "Elite Banquets",
    location: "delhi",
    eventType: "wedding",
    food: "both",
    capacity: "150",
  },
  {
    id: 5,
    name: "Sunset Hall",
    location: "chennai",
    eventType: "conference",
    food: "vegetarian",
    capacity: "100",
  },
  {
    id: 6,
    name: "Ocean View",
    location: "delhi",
    eventType: "birthday",
    food: "non-vegetarian",
    capacity: "200",
  },
  {
    id: 7,
    name: "Rasana Garden",
    location: "delhi",
    eventType: "conference",
    food: "Vegetarian",
    capacity: "80",
  },
 
];

const filteredHalls = halls.filter((hall) => 
  hall.name.toLowerCase().includes(search.toLowerCase()) &&
  (eventType ? hall.eventType === eventType : true) &&
  (location ? hall.location === location : true) &&
  (foodPreference ? hall.food === foodPreference : true) &&
  (capacity ? hall.capacity === capacity : true)
);

  const navigate = useNavigate();

  return (

    <>

<div className=' h-[100%]   mb-20 flex items-center justify-center   flex-wrap gap-6'>

<div className='max-w-5xl'>
      <div className='text-3xl mt-30 font-bold uppercase text-center text-green-800 mb-5'>
           Event Page
      </div>
      <div className="w-full flex flex-wrap mt-5 justify-center gap-2  ">
 
  <input
    type="text"
    placeholder="Search Event Hall Name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded px-3 py-2 w-60"
  />

 
  <select
    value={eventType}
    onChange={(e) => setEventType(e.target.value)}
    className="border rounded px-3 py-2 w-60"
  >
    <option value="">Select Event Type</option>
    <option value="wedding">Wedding</option>
    <option value="birthday">Birthday</option>
    <option value="conference">Conference</option>
  </select>

 
  <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="border rounded px-3 py-2 w-60"
  >
    <option value="">Select Location</option>
    <option value="chennai">Chennai</option>
    <option value="delhi">Delhi</option>
  </select>

 
  <select
    value={foodPreference}
    onChange={(e) => setFoodPreference(e.target.value)}
    className="border rounded px-3 py-2 w-60"
  >
    <option value="">Food Preference</option>
    <option value="vegetarian">Vegetarian</option>
    <option value="non-vegetarian">Non-Vegetarian</option>
    <option value="both">Both</option>
  </select>

  <select
    value={capacity}
    onChange={(e) => setCapacity(e.target.value)}
    className="border rounded px-3 py-2 w-60"
  >
    <option value="">Capacity</option>
    <option value="50">50</option>
    <option value="60">60</option>
    <option value="both">80</option>
  </select>

      </div>
 
     <div className="w-full mt-10 flex flex-wrap justify-center   gap-6">
  {filteredHalls.map((hall) => (
    <div
      key={hall.id}
      className="bg-white shadow-2xl border-2 pt-2 rounded-2xl max-w-2xs text-center"
    >
      <img
        className="w-[300px] h-[150px] rounded-t-2xl"
        src="/images/1.png"
        alt={hall.name}
      />
      <h2 className="text-2xl font-bold text-green-800 tracking-wide mb-2 mt-2">
        {hall.name}
      </h2>
      <p className="px-4 text-gray-600 leading-relaxed mb-2">
      Taj Palace, New Delhi, is a luxury hotel with 403 guest rooms, 48,448 sq. ft. of meeting space, 11 indoor venues, 2 lawns, and 4 restaurants.
      </p>
      <div className="flex gap-6 justify-around items-center">
        <ul className="gap-1 text-left text-gray-700">
          <li>✅ AC Rooms</li>
          <li>✅ Water</li>
          <li>✅ {hall.food}</li>
        </ul>
        <div>
          <p className="flex items-center text-amber-600 font-bold">Capacity</p>
          <p className="border border-black rounded-2xl text-amber-600 font-bold">{hall.capacity}</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/CheckAvailabilityForm")}
        className="bg-blue-500 text-white mt-5 mb-5 px-5 py-2 rounded-2xl"
      >
        Check Availability  
      </button> 
    </div>
  ))}
      </div>

</div>
</div>

    </>
  )
}

export default EventPage
