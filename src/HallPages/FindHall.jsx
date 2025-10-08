import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindHall.css';

const FindHall = () => {
    const navigate = useNavigate();

    // State to store venues fetched from the backend
    const [allVenues, setAllVenues] = useState([]);

    // States for all filters
    const [searchTerm, setSearchTerm] = useState('');
    const [eventType, setEventType] = useState('All');
    const [location, setLocation] = useState('All');
    const [foodPref, setFoodPref] = useState('All');
    const [capacity, setCapacity] = useState('All');
    const [budget, setBudget] = useState('All');

    // --- ✨ NEW: Fetch data from the Spring Boot backend ---
    useEffect(() => {
        const fetchHalls = async () => {
            try {
                // Fetch data from your backend API
                const response = await fetch('http://localhost:8080/api/halls');
                const data = await response.json();

                // Map database fields to the names your component expects
                const formattedData = data.map(hall => ({
                    id: hall.hallId,
                    name: hall.hallName,
                    category: hall.categories,
                    image: hall.imageLink,
                    location: hall.location,
                    eventType: hall.eventType, // Mapped from 'full_location' column
                    food: hall.food,
                    capacity: hall.capacity,
                    budget: hall.budget
                }));

                setAllVenues(formattedData);
            } catch (error) {
                console.error("Error fetching hall data:", error);
            }
        };

        fetchHalls();
    }, []); // Empty array means this effect runs only once when the component mounts

    
    const filteredVenues = useMemo(() => {
        let venues = allVenues;

        // Search term filter
        if (searchTerm) {
            venues = venues.filter(venue =>
                venue.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // Event type filter
        if (eventType !== 'All') {
            venues = venues.filter(venue => venue.eventType === eventType);
        }
        // Location filter
        if (location !== 'All') {
            venues = venues.filter(venue => venue.location === location);
        }
        // Food preference filter
        if (foodPref !== 'All') {
            venues = venues.filter(venue => venue.food === foodPref);
        }
        // Capacity filter
        if (capacity !== 'All') {
            const [min, max] = capacity.split('-').map(Number);
            venues = venues.filter(venue => venue.capacity >= min && (max ? venue.capacity <= max : true));
        }
        // Budget filter
        if (budget !== 'All') {
            const [min, max] = budget.split('-').map(Number);
            venues = venues.filter(venue => venue.budget >= min && (max ? venue.budget <= max : true));
        }

        return venues;
    }, [searchTerm, eventType, location, foodPref, capacity, budget, allVenues]); // allVenues is now a dependency

    const handleCheckAvailability = (venueId) => {
        navigate(`/venue/${venueId}`);
    };

    return (
        <div className="find-hall-container">
            <aside className="sidebar">
                <h3>Find Halls</h3>
                
                <div className="filter-group">
                    <label htmlFor="hallSearch">Search Event Hall Name</label>
                    <input
                        type="text"
                        id="hallSearch"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        list="hall-names"
                    />
                    <datalist id="hall-names">
                        {allVenues.map(venue => (
                            <option key={venue.id} value={venue.name} />
                        ))}
                    </datalist>
                </div>
                
                {/* --- Filters (No changes needed here) --- */}
                <div className="filter-group">
                    <label>Select Event Type</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                        <option value="All">All</option>
                        <option>Engagement</option>
                        <option>Wedding</option>
                        <option>Birthday Party</option>
                        <option>Corporate Event</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Select Location</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="All">All</option>
                        <option>Pune</option>
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Bangalore</option>
                        <option>Lucknow</option>
                        <option>Chennai</option>
                    </select>
                </div>
                
                <div className="filter-group">
                    <label>Food Preference</label>
                    <select value={foodPref} onChange={(e) => setFoodPref(e.target.value)}>
                        <option value="All">All</option>
                        <option>Both</option>
                        <option>Veg</option>
                        <option>Non-Veg</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Capacity</label>
                    <select value={capacity} onChange={(e) => setCapacity(e.target.value)}>
                        <option value="All">All</option>
                        <option>0-100</option>
                        <option>100-500</option>
                        <option>500-1000</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Budget (In INR)</label>
                    <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                        <option value="All">All</option>
                        <option>0-5000</option>
                        <option>5000-10000</option>
                        <option>10000-20000</option>
                    </select>
                </div>
            </aside>

            <main className="main-content">
                <div className="halls-grid">
                    {/* --- Display logic (No changes needed here) --- */}
                    {filteredVenues.length > 0 ? (
                        filteredVenues.map(venue => (
                            <div className="hall-card" key={venue.id}>
                                <div className="hall-image-container">
                                    <img src={venue.image} alt={venue.name} className="hall-image" />
                                </div>
                                <div className="hall-details">
                                    <h4>{venue.name}</h4>
                                    <button
                                        className="availability-btn"
                                        onClick={() => handleCheckAvailability(venue.id)}
                                    >
                                        Check Availability
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No halls found matching your criteria.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default FindHall;