// src/HallPages/FindHall.jsx

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindHall.css';

// --- ✨ Updated Data (saari details ke saath) ---
const allVenues = [
  { id: 1, name: 'Elite Banquets', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Veg', capacity: 150, eventType: 'Corporate Event' },
  { id: 2, name: 'Sunset Hall', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Non-Veg', capacity: 300, eventType: 'Wedding' },
  { id: 3, name: 'Ocean View', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Both', capacity: 800, eventType: 'Wedding' },
  { id: 4, name: 'Royal Gardens', image: 'https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 450, eventType: 'Birthday Party' },
  { id: 5, name: 'The Heritage Club', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 600, eventType: 'Corporate Event' },
  { id: 6, name: 'Golden Pavilion', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Veg', capacity: 200, eventType: 'Birthday Party' },
  { id: 7, name: 'Starlight Lounge', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Non-Veg', capacity: 100, eventType: 'Corporate Event' },
  { id: 8, name: 'The Rosewood', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Veg', capacity: 350, eventType: 'Wedding' },
  { id: 9, name: 'The Regency', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 700, eventType: 'Wedding' },
  { id: 10, name: 'The Celestial', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 250, eventType: 'Birthday Party' },
  { id: 11, name: 'The Majestic', image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop', location: 'Mumbai', food: 'Both', capacity: 900, eventType: 'Corporate Event' },
  { id: 12, name: 'The Sovereign', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Non-Veg', capacity: 80, eventType: 'Birthday Party' },
  { id: 13, name: 'The Pinnacle', image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop', location: 'Lucknow', food: 'Both', capacity: 550, eventType: 'Wedding' }
];

const FindHall = () => {
  const navigate = useNavigate();
  
  // ✨ Step 1: Har filter ke liye state banayein
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('All');
  const [location, setLocation] = useState('All');
  const [foodPref, setFoodPref] = useState('All');
  const [capacity, setCapacity] = useState('All');

  // ✨ Step 2: Filtering logic ko update karein
  const filteredVenues = useMemo(() => {
    let venues = allVenues;
    console.log('Step A: Shuru mein kitne venues hain?',venues.length);

    // Search term se filter
    if (searchTerm) {
      venues = venues.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Event type se filter
    if (eventType !== 'All') {
        venues = venues.filter(venue => venue.eventType === eventType);
    }
    // Location se filter
    if (location !== 'All') {
        venues = venues.filter(venue => venue.location === location);
    }
    // Food preference se filter
    if (foodPref !== 'All') {
        venues = venues.filter(venue => venue.food === foodPref);
    }
    // Capacity se filter
    if (capacity !== 'All') {
        const [min, max] = capacity.split('-').map(Number);
        venues = venues.filter(venue => venue.capacity >= min && (max ? venue.capacity <= max : true));
    }
    console.log('Step B: Filter ke baad kitne venues bache?',venues.length);
    
    return venues;
  }, [searchTerm, eventType, location, foodPref, capacity]); // dependency array mein state add karein

  const handleCheckAvailability = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  return (
    <div className="find-hall-container">
      <aside className="sidebar">
        <h3>Find Halls</h3>
        
        <div className="filter-group">
          <label htmlFor="hallSearch">Search Event Hall Name</label>
          <input
            type="text"
            id="hallSearch"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            list ="hall-names" />
            
            <datalist id="hall-names">
            {allVenues.map(venue => (
      <option key={venue.id} value={venue.name} />
          ))}
         </datalist>
        </div>
        
        {/* ✨ Step 3: Filters ko state se connect karein */}
        <div className="filter-group">
          <label>Select Event Type</label>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option>Engagement</option>
            <option>Wedding</option>
            <option>Birthday Party</option>
            <option>Corporate Event</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>Pune</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Lucknow</option>
            <option>Chennai</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Food Preference</label>
          <select value={foodPref} onChange={(e) => setFoodPref(e.target.value)}>
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Both</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Capacity</label>
          <select value={capacity} onChange={(e) => setCapacity(e.target.value)}>
            <option>0-100</option>
            <option>100-500</option>
            <option>500-1000</option>
          </select>
        </div>
      </aside>

      <main className="main-content">
        <div className="halls-grid">
          {filteredVenues.length > 0 ? (
            filteredVenues.map(venue => (
              <div className="hall-card" key={venue.id}>
                <div className="hall-image-container">
                  <img src={venue.image} alt={venue.name} className="hall-image" />
                </div>
                <div className="hall-details">
                  <h4>{venue.name}</h4>
                  <button
                    className="availability-btn"
                    onClick={() => handleCheckAvailability(venue.id)}
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No halls found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default FindHall;