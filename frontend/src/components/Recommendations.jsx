import React from 'react';
import { useNavigate } from 'react-router-dom';

const recommendations = [
  { id: 1, text: 'Timeless elegance and pure sophistication.', img: 'images/rec1.jpeg', page: 'elegant' },
  { id: 2, text: 'A grand setting for unforgettable moments.', img: 'images/rec2.jpeg', page: 'grand' },
  { id: 3, text: 'Modern style meets classic charm.', img: 'images/rec3.jpg', page: 'modern' },
  { id: 4, text: 'Where every detail is perfectly planned.', img: 'images/rec4.jpeg', page: 'planning' },
];

const RecommendationCard = ({ item, navigate }) => {
  const handleClick = () => navigate(`/${item.page}`);

  return (
    <div
      className="venue-card"
      style={{
        cursor: 'pointer',
        flex: '1 1 200px',
        margin: '10px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={item.img}
        alt={item.text}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />
      <div style={{ padding: '10px', backgroundColor: '#fff' }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{item.text}</p>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '40px 20px', backgroundColor: '#f7f7f9' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
            color: '#333',
          }}
        >
          Personalized Recommendations
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {recommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
