import React from 'react';

const recommendations = [
  { id: 1, text: 'Timeless elegance and pure sophistication.', img: 'https://images.unsplash.com/photo-1522202222243-7b7f2b05c5a2?w=500&q=80' },
  { id: 2, text: 'A grand setting for unforgettable moments.', img: 'https://images.unsplash.com/photo-1549294473-8203f2b5d436?w=500&q=80' },
  { id: 3, text: 'Modern style meets classic charm.', img: 'https://images.unsplash.com/photo-1616594216346-b6d35c5c8e6a?w=500&q=80' },
  { id: 4, text: 'Where every detail is perfectly planned.', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80' },
];

// Using the same VenueCard component structure for recommendations
const RecommendationCard = ({ item }) => (
  <div className="venue-card">
    <img src={item.img} alt={item.text} />
    <div className="venue-card-info">
      <p>{item.text}</p>
    </div>
  </div>
);

const Recommendations = () => {
  return (
    <section className="recommendations-section">
      <div className="container">
        <h2 className="section-title">AI-Powered Personalized Recommendations</h2>
        <div className="recommendations-grid">
          {recommendations.map(item => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;