
// modern.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './modern.css';

const ModernEventPlanner = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Header Section */}
      <header className="header">
        <div className="overlay"></div>
        <div className="header-content">
          <h1>Every Detail, Perfectly Planned</h1>
          <p>
            For those who envision perfection in every element. Discover our handpicked selection of vendors dedicated to crafting a flawless, customized event experience.
          </p>
        </div>
      </header>

      <main className="container">
    

<section className="section venues-section">
  <h2>Venues with Impeccable Service</h2>
  <div className="grid grid-4">
    {[
      {
        name: 'The Grand Hyatt Estate',
        img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2070&q=80',
      },
      {
        name: 'The Oberoi Sky Lounge',
        img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2070&q=80',
      },
      {
        name: 'The Palace Banquet Hall',
        img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2098&q=80',
      },
      {
        name: 'The Serene Beach Resort',
        img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=2080&q=80',
      },
      {
        name: 'The Crystal Garden Pavilion',
        img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2070&q=80',
      },
      {
        name: 'The Sapphire Mountain Retreat',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2070&q=80',
      },
    ].map((venue, i) => (
      <div key={i} className="venue-card" style={{ backgroundImage: `url(${venue.img})` }}>
        <div className="venue-overlay"></div>
        <div className="venue-footer">
          <div className="venue-info">
            <h3>{venue.name}</h3>
            <div className="rating">
              <span className="price-symbol">€9</span>
              <div className="stars">★★★★★</div>
              <span className="reviews">89 Reviews</span>
            </div>
          </div>
          <button
  className="button light small"
  onClick={() => navigate('/Login')}
>
  Check Availability
</button>
        </div>
      </div>
    ))}
  </div>
</section>



        <hr className="divider" />
 
 
{/* Expert Planners Section */}
<section className="section">
  <h2>Expert Planners & Vision Designers</h2>
  <div className="grid grid-3">
    {[
      {
        name: 'Priya Singh',
        role: 'Luxury Event Designer',
        price: '€ 18,000',
        img: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=2110&q=80',
      },
      {
        name: 'Aarav Mehta',
        role: 'Destination Wedding Planner',
        price: '€ 22,000',
        img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=2070&q=80',
      },
      {
        name: 'Sofia Alvarez',
        role: 'Creative Event Stylist',
        price: '€ 19,500',
        img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2070&q=80',
      },
    ].map((planner, i) => (
      <div
        key={i}
        className="planner-card bg-image"
        style={{ backgroundImage: `url(${planner.img})` }}
      >
        <div className="planner-footer-bar">
          <div className="planner-info">
            <h3>{planner.name}</h3>
            <p>{planner.role}</p>
            <div className="stars">★★★★★</div>
          </div>
          <div className="planner-footer-right">
            <p className="price">{planner.price}</p>
            <button
  className="button light small"
  onClick={() => {
    window.location.href = "tel:+1234567890";
  }}
>
  Call Now
</button>

          </div>
        </div>
      </div>
    ))}
  </div>
</section>




        
        {/* Bespoke Creations Section */}
<section className="section bespoke-section">
  <h2>Bespoke Creations & Finishing Touches</h2>
  <div className="grid grid-3">
    {[
      {
        name: 'Opulent Tiered Cake by Bridal Couture House',
        img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1974&q=80',
        price: '€ 58,000',
      },
      {
        name: 'Ritika Kapoor Designer Wedding Artist',
        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2120&q=80',
        price: '€ 118,000',
      },
      {
        name: 'Custom‑Tailored Tuxedo by Aloxior Designer Wedding Wear',
        img: 'https://images.pexels.com/photos/29080966/pexels-photo-29080966.jpeg',  
        price: '€ 158,000',
      },
      {
        name: 'Custom‑Tailored Tuxedo by Aloxior Designer Wedding Wear (Alternate Angle)',
        img: 'https://images.pexels.com/photos/32878559/pexels-photo-32878559.jpeg',  
        price: '€ 158,000',
      },
      {
        name: 'Handcrafted Bridal Gown by Elenora Haute Couture',
        img: 'https://images.pexels.com/photos/28863321/pexels-photo-28863321.jpeg',   
        price: '€ 245,000',
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bespoke-card bg-image"
        style={{ backgroundImage: `url(${item.img})` }}
      >
        <div className="bespoke-footer-bar">
          <div className="bespoke-info">
            <h3>{item.name}</h3>
          </div>
          <div className="bespoke-footer-right">
            <p className="price">{item.price}</p>
            <button className="button light small">Order Now</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      </main>
    </div>
  );
};

export default ModernEventPlanner;
