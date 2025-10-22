import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// import { allVenues } from '../Data/venuesData'; // Iski zaroorat nahi hai

// --- Styles (Aap apni CSS istemal karein) ---
const pageStyle = { padding: '40px', fontFamily: 'sans-serif', background: '#f4f4f4' };
const headingStyle = { textAlign: 'center', marginBottom: '10px', color: '#333' }; 
const subHeadingStyle = { textAlign: 'center', marginBottom: '30px', color: '#555' };
const listStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', listStyle: 'none', padding: 0 };

const itemStyle = { 
    border: '1px solid #ddd', 
    borderRadius: '8px', 
    padding: '15px', 
    backgroundColor: '#fff', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between' 
};

const imageStyle = { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' };
const nameStyle = { fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px', marginTop: '5px', color: '#333' };

// --- YAHAN BUTTON STYLE UPDATE KIYA GAYA HAI ---
const buttonStyle = { 
    padding: '10px 15px', 
    backgroundColor: '#28a745', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', // Card ke border radius se match kiya
    cursor: 'pointer', 
    textAlign: 'center',
    textDecoration: 'none',
    width: '100%', 
    marginTop: '15px',
    boxSizing: 'border-box' // <-- YEH FIX HAI. Yeh padding ko width ke andar rakhega.
};
// --- ---

const detailTextStyle = { 
    fontSize: '0.9rem', 
    color: '#555', 
    margin: '4px 0 0 0', 
    textAlign: 'left' 
};
// --- ---

function BookingSuggestions() {
    const location = useLocation();
    const suggestions = location.state?.suggestions;
    const originalBookingDate = location.state?.bookingDate;

    const placeholderImage = 'https://placehold.co/600x400/eee/ccc?text=No+Image';

    if (!suggestions || suggestions.length === 0) {
        return (
            <div style={pageStyle}>
                <h2 style={headingStyle}>No Suggestions Available</h2>
                <p style={subHeadingStyle}>We couldn't find any alternative halls for the selected date.</p>
                <Link to="/findhall" style={{...buttonStyle, width: '200px', margin: 'auto'}}>Go back to Find Halls</Link>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <h2 style={headingStyle}>Hall Not Available</h2>
            <p style={subHeadingStyle}>
                The hall you selected is already booked on that date.
                However, you might like these venues:
            </p>
            <ul style={listStyle}>
                {suggestions.map(hall => (
                    <li key={hall.id} style={itemStyle}>
                        <div> 
                            <img
                                src={hall.imageLink || placeholderImage}
                                alt={hall.name}
                                style={imageStyle}
                                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                            />
                            <div style={nameStyle}>{hall.name}</div>
                            
                            <p style={detailTextStyle}>
                                <strong> Location:</strong> {hall.location || 'N/A'}
                            </p>
                            <p style={detailTextStyle}>
                                <strong>👥 Capacity:</strong> {hall.capacity ? `${hall.capacity} Guests` : 'N/A'}
                            </p>
                            <p style={detailTextStyle}>
                                <strong>₹ Budget:</strong> {hall.budget ? `₹${hall.budget.toLocaleString('en-IN')}` : 'N/A'}
                            </p>
                        </div>

                        <Link 
                            to={`/venue/${hall.id}`} 
                            style={buttonStyle}
                        >
                            Book Now
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingSuggestions;