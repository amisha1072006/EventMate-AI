import React from 'react';
import './Trending.css';
const venues = [
{ id: 1, name: 'Elite Banquets', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Veg', capacity: 150, eventType: 'Corporate Event' },
  { id: 2, name: 'Sunset Hall', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Non-Veg', capacity: 300, eventType: 'Wedding' },
  { id: 3, name: 'Ocean View', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Both', capacity: 800, eventType: 'Wedding' },
  { id: 4, name: 'Royal Gardens', image: 'https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 450, eventType: 'Birthday Party' }
];

// ✨ बदला हुआ VenueCard कंपोनेंट
// हमने (venue) को ({ image, name }) से बदल दिया है
const VenueCard = ({ image, name }) => (
  <div className='venue-card'>
    {/* ✨ अब हम सीधे 'image' और 'name' का उपयोग कर रहे हैं */}
    <img src={image} alt={name} className="venue-card-image" />
    <div className="venue-card-info">
      <h3>{name}</h3>
      <p>⭐ 4.5</p> {/* Example rating */}
    </div>
  </div>
);

const TrendingVenues = () => {
  return (
    <div className="trending-venues-container">
      <h2>Trending Venues</h2>
      <div className="venues-grid">
        {/* We will only show the first 4-5 venues as "trending" */}
        {venues.slice(0, 5).map((venue) => (
          <VenueCard 
            key={venue.id} 
            name={venue.name} 
            image={venue.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingVenues;