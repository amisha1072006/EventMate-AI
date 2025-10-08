// src/Pages/VenueDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './VenueDetails.css';

const VenueDetails = () => {
    // 1. GET DATA FROM URL AND SET UP STATE
    const { venueId } = useParams(); // Get the venue ID from the URL (e.g., /venue/1)
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [step, setStep] = useState(1); // 1: Calendar, 2: User Info, 3: Success
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [confirmedBooking, setConfirmedBooking] = useState(null); // To store successful booking details

    // 2. FETCH VENUE DETAILS FROM BACKEND WHEN PAGE LOADS
    useEffect(() => {
        const fetchVenueDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/halls/${venueId}`);
                if (response.ok) {
                    const data = await response.json();
                    setVenue(data);
                } else {
                    console.error("Failed to fetch venue details");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchVenueDetails();
    }, [venueId]);

    // 3. HANDLE FINAL BOOKING SUBMISSION TO BACKEND
    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            hallId: venue.hallId,
            userName: userName,
            userPhone: userPhone,
            bookingTime: selectedDateTime.toISOString() // Convert date to standard format
        };

        try {
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (response.status === 201) {
                const savedBooking = await response.json();
                setConfirmedBooking(savedBooking); // Save the confirmed booking details
                setStep(3); // Go to success step ONLY after successful API call
            } else {
                alert("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during booking:", error);
            alert("An error occurred during booking.");
        }
    };

    // Show loading message while fetching
    if (!venue) {
        return <div>Loading venue details...</div>;
    }

    // 4. RENDER THE COMPONENT
    return (
        <div className="venue-details-container">
            {/* Left Side: Venue Info Card */}
            <div className="venue-info-card">
                <img src={venue.imageLink} alt={venue.hallName} className="venue-image" />
                <h2>{venue.hallName}</h2>
                <p>This is a premium hall with world-class facilities. Perfect for weddings, corporate events, and parties.</p>
            </div>

            {/* Right Side: Booking Flow Card */}
            <div className="booking-flow-card">
                {/* Step 1: Calendar */}
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
                            />
                        </div>
                        <button className="flow-btn" onClick={() => setStep(2)}>Next</button>
                    </>
                )}

                {/* Step 2: User Info Form */}
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

                {/* Step 3: Success Message */}
                {step === 3 && confirmedBooking && (
                    <div className="success-message">
                        <h3>Booking Successful!</h3>
                        <p>Your booking for <strong>{venue.hallName}</strong> has been confirmed.</p>
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