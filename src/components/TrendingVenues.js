import React from 'react';

const venues = [
  { id: 1, name: 'Palace Mayfair', rating: 4.8, img: 'https://images.unsplash.com/photo-1596591603951-c823ff2a1590?w=500&q=80' },
  { id: 2, name: 'Festsaal Königspalast', rating: 4.9, img: 'https://images.unsplash.com/photo-1542037104857-e93b0fe58476?w=500&q=80' },
  { id: 3, name: 'Asse Tap Room', rating: 4.7, img: 'https://images.unsplash.com/photo-1555837579-5e58535b4425?w=500&q=80' },
  { id: 4, name: 'Penton Park', rating: 4.8, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80' },
  { id: 5, name: 'Titanic Town Hall', rating: 4.9, img: 'https://images.unsplash.com/photo-1604924151324-2c6b45398547?w=500&q=80' },
];

const VenueCard = ({ venue }) => (
  <div className="venue-card">
    <img src={venue.img} alt={venue.name} />
    <div className="venue-card-info">
      <h3>{venue.name}</h3>
      <p>⭐ {venue.rating}</p>
    </div>
  </div>
);

const TrendingVenues = () => {
  return (
    <section className="trending-section">
      <div className="container">
        <h2 className="section-title">Trending Venues</h2>
        <div className="venues-slider">
          {venues.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingVenues;