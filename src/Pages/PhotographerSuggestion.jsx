import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig'; 

const PhotographerSuggestion = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // URL se date nikaalein (date=2025-10-30)
    const date = searchParams.get('date');

    useEffect(() => {
        if (date) {
            setLoading(true);
            // Available photographers fetch karne ka API call
            apiClient.get(`/api/photographers/available?date=${date}`)
                .then(response => {
                    // Response data ko safely set karein
                    setSuggestions(response.data || []); 
                })
                .catch(error => {
                    // API call fail hone par bhi blank page nahi aayega
                    console.error("Error fetching available photographers:", error);
                    setSuggestions([]); 
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [date]);

    // Jab user kisi suggested photographer par click karega
    const handleViewDetails = (photographerId) => {
        // User ko uss photographer ki details page par bhej dein
        navigate(`/photographer/${photographerId}`); 
    };

    if (!date) {
         return <div style={styles.message}>Booking conflict date not found.</div>;
    }
    
    if (loading) {
        return <div style={styles.loading}>Finding available photographers for {date}...</div>;
    }

    // --- Component JSX Render ---
    return (
        <div style={styles.container}>
            <main style={styles.mainContent}>
                <h2 style={styles.header}>Photographer Not Available</h2>
                <p style={styles.subHeader}>
                    The photographer you selected is already booked on <strong>{date}</strong>. 
                    <br />
                    Here are other photographers available on that day. Click to view details and book:
                </p>

                {/* --- Available Photographers Grid --- */}
                <div style={styles.grid}> 
                    {suggestions.length > 0 ? (
                        suggestions.map(photographer => (
                            // *Key aur onClick mein photographerId use karein, jo ki sahi hai*
                            <div 
                                style={styles.card} 
                                key={photographer.photographerId} 
                                onClick={() => handleViewDetails(photographer.photographerId)}
                            >
                                <div style={styles.imageContainer}> 
                                    <img 
                                      // *Optional Chaining use karein*
                                      src={photographer?.imageLink || "/default-profile.png"} 
                                      alt={photographer.name ?? "Photographer"} 
                                      style={styles.image} 
                                    /> 
                                </div>
                                <div style={styles.details}>
                                    {/* *Nullish Coalescing (??) use karein* */}
                                    <h4 style={styles.cardTitle}>{photographer.name ?? "N/A Name"}</h4>
                                    <p style={styles.cardText}>Location: {photographer.location ?? "N/A Location"}</p>
                                    <p style={styles.cardText}>Starts at: ₹{photographer.startingPrice ?? "N/A Price"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Agar list khali ho toh yeh message dikhega
                        <p style={styles.noResults}>Sorry, no other photographers found available for {date}.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

// --- CSS-in-JS STYLES (Styles block same rahega) ---
const styles = {
    container: { 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#f9fafb', 
        minHeight: '100vh', 
    },
    mainContent: { 
        width: '100%', 
        maxWidth: '1200px', 
    },
    header: { 
        fontSize: '2rem', 
        fontWeight: 700, 
        color: '#d9534f', 
        textAlign: 'center', 
        marginBottom: '10px', 
    },
    subHeader: { 
        fontSize: '1.1rem', 
        color: '#333', 
        textAlign: 'center', 
        marginBottom: '40px', 
        lineHeight: 1.6, 
    },
    loading: { 
        fontSize: '1.5rem', 
        textAlign: 'center', 
        marginTop: '100px', 
    },
    noResults: { 
        fontSize: '1.2rem', 
        textAlign: 'center', 
        width: '100%', 
    },
    grid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px', 
    },
    card: { 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)', 
        overflow: 'hidden', 
        cursor: 'pointer' 
    },
    imageContainer: { 
        width: '100%', 
        height: '200px', 
    },
    image: { 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
    },
    details: { 
        padding: '15px', 
    },
    cardTitle: { 
        margin: '0 0 10px 0', 
        fontSize: '1.2rem', 
    },
    cardText: { 
        margin: '0 0 10px 0', 
        color: '#555', 
        fontSize: '0.9rem' 
    },
};

export default PhotographerSuggestion;