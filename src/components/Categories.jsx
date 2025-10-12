


import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChurch, FaBriefcase, FaBirthdayCake, FaMusic } from "react-icons/fa";
import './Categories.css';

// Data mein koi badlav nahi
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
  // ✅ Step 1: Initial state ko 'null' rakhein
  const [category, setCategory] = useState(null);

  // ✅ Step 2: Button click ke liye ek function banayein
  const handleCategoryClick = (selectedCat) => {
    // Agar user usi button par dobara click kare, to selection hata dein
    if (category === selectedCat) {
      setCategory(null);
    } else {
      setCategory(selectedCat);
    }
  };

  // Filtering logic
  const filteredVenues = useMemo(() => {
    // Agar koi category select nahi hai, to khali array return karein
    if (!category) {
      return [];
    }
    // Nahi to, select ki hui category ke anusaar filter karein
    return allVenues.filter(venue => venue.category === category);
  }, [category]);

  const handleCheckAvailability = (venueId) => {
    navigate(`/Login`);
  };

  return (
    <>
      <div className="category-header">
        <aside className="catbar">
          <h3>Find By Category</h3>
          <div className="filter-group">
            <div className="category-icons">
              {/* ✅ Step 3: Naye function ko 'onClick' mein istemaal karein */}
              <button
                className={`category-btn ${category === "Weddings" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Weddings")}
              >
                <FaChurch /> <span>Weddings</span>
              </button>
              <button
                className={`category-btn ${category === "Corporate" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Corporate")}
              >
                <FaBriefcase /> <span>Corporate</span>
              </button>
              <button
                className={`category-btn ${category === "Birthdays" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Birthdays")}
              >
                <FaBirthdayCake /> <span>Birthdays</span>
              </button>
              <button
                className={`category-btn ${category === "Concerts" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Concerts")}
              >
                <FaMusic /> <span>Concerts</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ✅ Step 4: POORE HALL SECTION PAR CONDITIONAL RENDERING LAGAYEIN */}
        {/* Yeh poora div sirf tabhi dikhega jab 'category' state null nahi hai */}
        {category && (
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
        )}
      </div>
    </>
  );
};

export default Categories;
