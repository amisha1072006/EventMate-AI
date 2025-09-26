import React from 'react';

const recommendations = [
  { id: 1, text: 'Timeless elegance and pure sophistication.', img: 'images/rec1.jpeg' },
  { id: 2, text: 'A grand setting for unforgettable moments.', img: 'images/rec2.jpeg' },
  { id: 3, text: 'Modern style meets classic charm.', img: 'images/rec3.jpg' },
  { id: 4, text: 'Where every detail is perfectly planned.', img: 'images/rec4.jpeg' },
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
        <h2 className="section-title">Personalized Recommendations</h2>
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