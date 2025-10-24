


import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChurch, FaBriefcase, FaBirthdayCake, FaMusic } from "react-icons/fa";
import './Categories.css';

// Data mein koi badlav nahi
const allVenues = [
  { id: 1, name: 'Elite Banquets', category:'Weddings',image:'https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg', location: 'Delhi', food: 'Veg', capacity: 150, eventType: 'Corporate Event' },
  { id: 2, name: 'Sunset Hall', category:'Corporate', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Non-Veg', capacity: 300, eventType: 'Wedding' },
  { id: 3, name: 'Ocean View', category:'Weddings', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Both', capacity: 800, eventType: 'Wedding' },
  { id: 4, name: 'Royal Gardens', category:'Corporate', image: 'https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 450, eventType: 'Birthday Party' },
  { id: 5, name: 'The Heritage Club', category:'Birthdays', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 600, eventType: 'Corporate Event' },
  { id: 6, name: 'Golden Pavilion', category:'Concerts',image:'https://media.istockphoto.com/id/2153497521/photo/moroccan-cultural-wedding-organization.jpg?s=2048x2048&w=is&k=20&c=6-0YPLf-u_A8y4dEO9AuzKg1A82mdVFS6F-V-pQw2Cw=',  location: 'Mumbai', food: 'Veg', capacity: 200, eventType: 'Birthday Party' },
  { id: 7, name: 'Starlight Lounge', category:'Birthdays',image:'https://media.istockphoto.com/id/450955083/photo/wedding.jpg?s=1024x1024&w=is&k=20&c=NrSTxwM01CQ6k5z_R_EJ0cEjHAZ4c8essmpIzRNwdnM=', location: 'Lucknow', food: 'Non-Veg', capacity: 100, eventType: 'Corporate Event' },
  { id: 8, name: 'The Rosewood', category:'Concerts',image:'https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=', location: 'Bangalore', food: 'Veg', capacity: 350, eventType: 'Wedding' },
  { id: 9, name: 'The Regency', category:'Concerts', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 700, eventType: 'Wedding' },
  { id: 10, name: 'The Celestial', category:'Birthdays',image: 'https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=',  location: 'Lucknow', food: 'Veg', capacity: 250, eventType: 'Birthday Party' },
  { id: 11, name: 'The Majestic', category:'Wedding',image:'https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=', location: 'Mumbai', food: 'Both', capacity: 900, eventType: 'Corporate Event' },
  { id: 12, name: 'The Sovereign', category:'Corporate',image:'https://media.istockphoto.com/id/1446334741/photo/desserts-and-table-decorations-for-parties-and-celebrations-photography-of-snacks-and.jpg?s=2048x2048&w=is&k=20&c=W_T4nsYSZJU1YEw5x2JHzIrNPw_6Hxuegd4VTAzyBxY=',  location: 'Bangalore', food: 'Non-Veg', capacity: 80, eventType: 'Birthday Party' },
  { id: 13, name: 'The Pinnacle', category:'Weddings',image:'https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=', location: 'Lucknow', food: 'Both', capacity: 550, eventType: 'Wedding' }
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
