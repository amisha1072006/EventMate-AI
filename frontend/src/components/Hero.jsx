import React, { useMemo, useState } from 'react';
import './Hero.css';
import { FaSearch } from 'react-icons/fa';
import { allVenues } from '../Data/venuesData';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allVenues
      .filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        (v.eventType ? v.eventType.toLowerCase().includes(q) : false)
      )
      .slice(0, 8);
  }, [query]);

  const handleSelect = (text) => {
    setQuery(text);
    setOpen(false);
    navigate('/login');
  };

  const submitSearch = () => {
    if (query.trim().length > 0) {
      navigate('/login');
      setOpen(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to EventMate AI</h1>
        <p>Your intelligent event planning and booking platform</p>
        <div className="search-bar" style={{ position: 'relative' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submitSearch();
              }
            }}
            placeholder="Search by name, location, or event type..."
            autoComplete="off"
          />
          <button className="search-btn" aria-label="search" onClick={submitSearch}>
            <FaSearch />
          </button>

          {open && results.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderTop: 'none',
                zIndex: 20,
                maxHeight: 240,
                overflowY: 'auto',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                color: '#111'
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {results.map(v => (
                <li
                  key={v.id}
                  onClick={() => handleSelect(v.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    borderTop: '1px solid #f3f4f6'
                  }}
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600, color: '#111' }}>{v.name}</span>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>
                      {v.location} • {v.eventType}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;