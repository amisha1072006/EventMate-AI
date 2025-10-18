// src/Pages/VenueDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './VenueDetails.css'; // Your custom CSS file
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const VenueDetails = () => {
    const { venueId } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [step, setStep] = useState(1);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [userName, setUserName] = useState(''); // State for name is used again
    const [userPhone, setUserPhone] = useState(''); // State for phone is used again
    const [confirmedBooking, setConfirmedBooking] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchVenueDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/halls/${venueId}`);
                if (response.ok) setVenue(await response.json());
            } catch (error) {
                console.error("Error fetching venue details:", error);
            }
        };

        const fetchBookedDates = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/bookings/hall/${venueId}/booked-dates`);
                if (response.ok) {
                    const dates = await response.json();
                    setBookedDates(dates.map(dateStr => new Date(dateStr)));
                }
            } catch (error) {
                console.error("Error fetching booked dates:", error);
            }
        };

        fetchVenueDetails();
        fetchBookedDates();
    }, [venueId]);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const token = localStorage.getItem('token');
        if (!token) {
            alert("You must be logged in to make a booking.");
            setIsSubmitting(false);
            navigate('/login');
            return;
        }
        
        const date = selectedDateTime;
        const localIsoString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

        const bookingData = {
            hallId: venue.hallId,
            userName: userName, // ADDED BACK
            userPhone: userPhone, // ADDED BACK
            bookingTime: localIsoString
        };

        try {
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bookingData),
            });

            if (response.status === 201) {
                const savedBooking = await response.json();
                setConfirmedBooking(savedBooking);
                setStep(3);
            } else {
                const errorMessage = await response.text();
                alert(`Booking failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error during booking:", error);
            alert("An error occurred during booking.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!venue) return <div>Loading venue details...</div>;

    return (
        <div className="venue-details-container">
            <div className="venue-info-card">
                <img src={venue.imageLink} alt={venue.hallName} className="venue-image" />
                <h2>{venue.hallName}</h2>
                <p>This is a premium hall with world-class facilities. Perfect for weddings, corporate events, and parties.</p>
                  <p className="venue-detail">
    <FaMapMarkerAlt className="venue-icon" /> <strong>Location:</strong> {venue.location}
  </p>
  <p className="venue-detail">
    <FaUsers className="venue-icon" /> <strong>Capacity:</strong> {venue.capacity} guests
  </p>
            </div>
            <div className="booking-flow-card">
                {step === 1 && (
                    <>
                        <h3>Select Date and Time</h3>
                        <div className="calendar-container">
                            <DatePicker
                                selected={selectedDateTime}
                                onChange={(date) => setSelectedDateTime(date)}
                                showTimeSelect
                                inline
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()}
                                excludeDates={bookedDates}
                            />
                        </div>
                        <button className="flow-btn" onClick={() => setStep(2)}>Next</button>
                    </>
                )}
                {/* RESTORED THE USER INFO FORM FOR STEP 2 */}
                {step === 2 && (
                    <>
                        <h3>Hall Booking - User Info</h3>
                        <form onSubmit={handleBookingSubmit}>
                            <div className="form-group">
                                <label>Enter your name</label>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Enter your phone number</label>
                                <input type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required />
                            </div>
                            <div className="button-group">
                                <button type="button" className="flow-btn back" onClick={() => setStep(1)} disabled={isSubmitting}>Back</button>
                                <button type="submit" className="flow-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Booking...' : 'Book'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
                {step === 3 && confirmedBooking && (
                    <div className="success-message">
                        <h3>Booking Successful!</h3>
                        <p>Your booking for <strong>{venue.hallName}</strong> has been confirmed.</p>
                        <p>Contact Name: {confirmedBooking.userName}</p>
                        <p>Date: {new Date(confirmedBooking.bookingTime).toLocaleString()}</p>
                        <p>Booking ID: {confirmedBooking.bookingId}</p>
                        <p>We will contact you shortly.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VenueDetails;


















