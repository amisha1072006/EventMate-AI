import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChurch, FaBriefcase, FaBirthdayCake, FaMusic, FaBorderAll } from "react-icons/fa";
import './Categories.css';

// --- ✨ Updated Data (saari details ke saath) ---
const allVenues = [
  { id: 1, name: 'Elite Banquets', category:'Weddings', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Veg', capacity: 150, eventType: 'Corporate Event' },
  { id: 2, name: 'Sunset Hall', category:'Corporate', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Non-Veg', capacity: 300, eventType: 'Wedding' },
  { id: 3, name: 'Ocean View', category:'Weddings', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Both', capacity: 800, eventType: 'Wedding' },
  { id: 4, name: 'Royal Gardens', category:'Corporate', image: 'https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 450, eventType: 'Birthday Party' },
  { id: 5, name: 'The Heritage Club', category:'Birthdays', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 600, eventType: 'Corporate Event' },
  { id: 6, name: 'Golden Pavilion', category:'Concerts', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Veg', capacity: 200, eventType: 'Birthday Party' },
  { id: 7, name: 'Starlight Lounge', category:'Birthdays', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Non-Veg', capacity: 100, eventType: 'Corporate Event' },
  { id: 8, name: 'The Rosewood', category:'Concerts', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Veg', capacity: 350, eventType: 'Wedding' },
  { id: 9, name: 'The Regency', category:'Concerts', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 700, eventType: 'Wedding' },
  { id: 10, name: 'The Celestial', category:'Birthdays', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 250, eventType: 'Birthday Party' },
  { id: 11, name: 'The Majestic', category:'Weddings', image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop', location: 'Mumbai', food: 'Both', capacity: 900, eventType: 'Corporate Event' },
  { id: 12, name: 'The Sovereign', category:'Corporate', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Non-Veg', capacity: 80, eventType: 'Birthday Party' },
  { id: 13, name: 'The Pinnacle', category:'Weddings', image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop', location: 'Lucknow', food: 'Both', capacity: 550, eventType: 'Wedding' }
];

const Categories = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');

  // Filtering logic
  const filteredVenues = useMemo(() => {
    let venues = allVenues;
    if (category !== 'temp') {
      venues = venues.filter(venue => venue.category === category);
    }
    return venues;
  }, [category]);

  const handleCheckAvailability = (venueId) => {
    navigate(`/Login`);
  };

  return (
    
    <>

<div class="category-header">
   
    <aside className="catbar">
        <h3>Find By Category</h3>

        {/* ✅ Category Icons Filter */}
        <div className="filter-group">
      
          <div className="category-icons">
            {/* <button 
              className={`category-btn ${category === "All" ? "active" : ""}`} 
              onClick={() => setCategory("All")}
            >
              <FaBorderAll /> <span>All</span>
            </button> */}
            <button 
              className={`category-btn ${category === "Weddings" ? "active" : ""}`} 
              onClick={() => setCategory("Weddings")}
            >
              <FaChurch /> <span>Weddings</span>
            </button>
            <button 
              className={`category-btn ${category === "Corporate" ? "active" : ""}`} 
              onClick={() => setCategory("Corporate")}
            >
              <FaBriefcase /> <span>Corporate</span>
            </button>
            <button 
              className={`category-btn ${category === "Birthdays" ? "active" : ""}`} 
              onClick={() => setCategory("Birthdays")}
            >
              <FaBirthdayCake /> <span>Birthdays</span>
            </button>
            <button 
              className={`category-btn ${category === "Concerts" ? "active" : ""}`} 
              onClick={() => setCategory("Concerts")}
            >
              <FaMusic /> <span>Concerts</span>
            </button>
          </div>
        </div>
      </aside>
   
    <div className="find-hall-container">
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

    </div>

    </>
  );
};

export default Categories;
