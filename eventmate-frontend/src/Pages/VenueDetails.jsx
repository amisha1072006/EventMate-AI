// src/Pages/VenueDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // DatePicker को इम्पोर्ट करें
import "react-datepicker/dist/react-datepicker.css"; // DatePicker की CSS
import './VenueDetails.css'; // हम यह नई CSS फाइल बनाएंगे

// सैंपल डेटा (असली ऐप में यह API से आएगा)
const venuesData = {
  1: { name: 'Elite Banquets', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop' },
  2: { name: 'Sunset Hall', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop' },
  3: { name: 'Ocean View', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
   4: {name: 'Royal Gardens', image: 'https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 450, eventType: 'Birthday Party' },
   5: {name: 'The Heritage Club', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 600, eventType: 'Corporate Event' },
  6: {name: 'Golden Pavilion', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Veg', capacity: 200, eventType: 'Birthday Party' },
  7: {name: 'Starlight Lounge', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Non-Veg', capacity: 100, eventType: 'Corporate Event' },
  8: {name: 'The Rosewood', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Veg', capacity: 350, eventType: 'Wedding' },
    9: {name: 'The Regency', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 700, eventType: 'Wedding' },
  10: {name: 'The Celestial', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 250, eventType: 'Birthday Party' },
   11: {name: 'The Majestic', image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop', location: 'Mumbai', food: 'Both', capacity: 900, eventType: 'Corporate Event' },
   12: {name: 'The Sovereign', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Non-Veg', capacity: 80, eventType: 'Birthday Party' },
  13: {name: 'The Pinnacle', image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop', location: 'Lucknow', food: 'Both', capacity: 550, eventType: 'Wedding' }
};

const VenueDetails = () => {
  const { venueId } = useParams(); // URL से वेन्यू की ID निकालें
  const [venue, setVenue] = useState(null);

  // बुकिंग फ्लो के स्टेप्स को मैनेज करने के लिए स्टेट
  const [step, setStep] = useState(1); // 1: Calendar, 2: User Info, 3: Success

  // फॉर्म डेटा के लिए स्टेट
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    // URL में मिली ID के आधार पर सही वेन्यू का डेटा सेट करें
    if (venuesData[venueId]) {
      setVenue(venuesData[venueId]);
    }
  }, [venueId]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Confirmed:', {
      venueId,
      venueName: venue.name,
      date: selectedDate,
      userName,
      userPhone
    });
    setStep(3); // तीसरे स्टेप (Success) पर जाएं
  };

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  return (
    <div className="venue-details-container">
      {/* ===== लेफ्ट साइड की जानकारी ===== */}
      <div className="venue-info-card">
        <img src={venue.image} alt={venue.name} className="venue-image" />
        <h2>{venue.name}</h2>
        <p>This is a premium hall with world-class facilities. Perfect for weddings, corporate events, and parties.</p>
      </div>

      {/* ===== राइट साइड का बुकिंग फ्लो ===== */}
      <div className="booking-flow-card">
        {/* स्टेप 1: कैलेंडर दिखाएं */}
        {step === 1 && (
          <>
            <h3>Select Date and Time</h3>
            <div className="calendar-container">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                inline
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <button className="flow-btn" onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {/* स्टेप 2: यूजर इन्फो फॉर्म दिखाएं */}
        {step === 2 && (
          <>
            <h3>Hall Booking - User Info</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Enter your name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Enter your phone number</label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  required
                />
              </div>
              <div className="button-group">
                <button type="button" className="flow-btn back" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="flow-btn">Book</button>
              </div>
            </form>
          </>
        )}

        {/* स्टेप 3: सफलता का मैसेज दिखाएं */}
        {step === 3 && (
          <div className="success-message">
            <h3>Booking Successful!</h3>
            <p>Your booking for <strong>{venue.name}</strong> has been confirmed.</p>
            <p>Date: {selectedDate.toString()}</p>
            <p>We will contact you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDetails;