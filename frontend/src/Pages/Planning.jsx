// modern.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './modern.css';

const Planning = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Header Section */}
      <header className="header">
        <div className="overlay"></div>
        <div className="header-content">
          <h1>Modern Style Meets Classic Charm</h1>
          <p>
            For those who envision perfection in every element. Discover our handpicked selection of vendors dedicated to crafting a flawless, customized event experience.
          </p>
        </div>
      </header>

      <main className="container">
        {/* Venues Section */}
        <section className="section venues-section">
          <h2>Venues — The Best of Both Worlds</h2>
          <div className="grid grid-4">
            {[
               
              {
                name: 'The Oberoi Sky Lounge',
                img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2070&q=80',
              },
              {
                name: 'The Palace Banquet Hall',
                img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2098&q=80',
              },
              {
                name: 'The Serene Beach Resort',
                img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2080&q=80',
              },
              {
                name: 'The Crystal Garden Pavilion',
                img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=2070&q=80',
              },
              {
                name: 'The Sapphire Mountain Retreat',
                img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2070&q=80',
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
                  <button className="button light small" onClick={() => navigate('/Login')}>
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
          <h2>Planners & Photographers Who Blend Styles</h2>
          <div className="grid grid-3">
            {[
              {
                name: 'Priya Singh',
                role: 'Luxury Event Designer',
                price: '€ 18,000',
                img: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=2110&q=80',
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
                        window.location.href = 'tel:+1234567890';
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
  <h2>Contemporary Classics</h2>
  <div className="grid grid-3">
    {[
      {
        name: 'Opulent Tiered Cake by Bridal Couture House',
        img: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 58,000',
      },
      {
        name: 'Ritika Kapoor Designer Wedding Artist',
        img: 'https://images.pexels.com/photos/2917343/pexels-photo-2917343.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 118,000',
      },
      {
        name: 'Custom-Tailored Tuxedo by Aloxior Designer Wear',
        img: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 158,000',
      },
      {
        name: 'Designer Wedding Wear (Alternate Look)',
        img: 'https://images.pexels.com/photos/2567379/pexels-photo-2567379.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 158,000',
      },
      {
        name: 'Handcrafted Bridal Gown by Elenora Haute Couture',
        img: 'https://images.pexels.com/photos/3014857/pexels-photo-3014857.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 245,000',
      },
      {
        name: 'Luxury Wedding Decor Setup by Aura Events',
        img: 'https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 95,000',
      },
      {
        name: 'Minimalist Diamond Necklace by Maison De Luxe',
        img: 'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 315,000',
      },
      {
        name: 'Romantic Wedding Table Decor by Velvet Petals',
        img: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 82,000',
      },
      {
        name: 'Designer Heels by Amora Bridal Studio',
        img: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1600',
        price: '€ 48,000',
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

export default Planning;
