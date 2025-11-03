// import React from 'react';

// const recommendations = [
//   { id: 1, text: 'Timeless elegance and pure sophistication.', img: 'images/rec1.jpeg' },
//   { id: 2, text: 'A grand setting for unforgettable moments.', img: 'images/rec2.jpeg' },
//   { id: 3, text: 'Modern style meets classic charm.', img: 'images/rec3.jpg' },
//   { id: 4, text: 'Where every detail is perfectly planned.', img: 'images/rec4.jpeg' },
// ];

// // Using the same VenueCard component structure for recommendations
// const RecommendationCard = ({ item }) => (
//   <div className="venue-card">
//     <img src={item.img} alt={item.text} />
//     <div className="venue-card-info">
//       <p>{item.text}</p>
//     </div>
//   </div>
// );

// const Recommendations = () => {
//   return (
//     <section className="recommendations-section">
//       <div className="container">
//         <h2 className="section-title">Personalized Recommendations</h2>
//         <div className="recommendations-grid">
//           {recommendations.map(item => (
//             <RecommendationCard key={item.id} item={item} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Recommendations;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const recommendations = [
  { 
    id: 1, 
    text: 'Timeless elegance and pure sophistication.', 
    img: 'images/rec1.jpeg', 
    link: '/halls/elegant' 
  },
  { 
    id: 2, 
    text: 'A grand setting for unforgettable moments.', 
    img: 'images/rec2.jpeg', 
    link: '/halls/grand' 
  },
  { 
    id: 3, 
    text: 'Modern style meets classic charm.', 
    img: 'images/rec3.jpg', 
    link: '/halls/modern' 
  },
  { 
    id: 4, 
    text: 'Where every detail is perfectly planned.', 
    img: 'images/rec4.jpeg', 
    link: '/services/planning' 
  },
];

// Card component
const RecommendationCard = ({ item, navigate }) => (
  <div
    className="venue-card"
    style={{ cursor: 'pointer', flex: '1 1 200px', margin: '10px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
    onClick={() => navigate(item.link)}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src={item.img} alt={item.text} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
    <div className="venue-card-info" style={{ padding: '10px', backgroundColor: '#fff' }}>
      <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{item.text}</p>
    </div>
  </div>
);

const Recommendations = () => {
  const navigate = useNavigate();

  return (
    <section className="recommendations-section" style={{ padding: '40px 20px', backgroundColor: '#f7f7f9' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', color: '#333' }}>Personalized Recommendations</h2>
        <div className="recommendations-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {recommendations.map(item => (
            <RecommendationCard key={item.id} item={item} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
