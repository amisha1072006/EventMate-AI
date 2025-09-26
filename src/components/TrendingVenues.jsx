import React from 'react';

const venues = [
  { id: 1, name: 'Palace Mayfair', rating: 4.8, img: '/images/trending1.jpg' },
  { id: 2, name: 'Festsaal Königspalast', rating: 4.9, img: '/images/trending2.jpeg' },
  { id: 3, name: 'Asse Tap Room', rating: 4.7, img: '/images/trending4.jpeg' },
  { id: 4, name: 'Penton Park', rating: 4.8, img: '/images/trending5.jpeg' },
  { id: 5, name: 'Titanic Town Hall', rating: 4.9, img: '/images/trending3.jpeg' },
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