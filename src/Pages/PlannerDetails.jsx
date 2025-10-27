
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaPhone, FaArrowLeft, FaTimes } from "react-icons/fa";

const planners = [
  {
    id: 1,
    name: "Elegant Events",
    rating: 4.9,
    price: "₹50,000",
    location: "Hyderabad",
    image: "/images/photo1.jpg",
    phone: "+91 91234 56780",
    description: "Specializes in luxury weddings, corporate events, and themed parties.",
    portfolio: [
      "/images/port1.jpg",
      "/images/port2.jpg",
      "/images/port3.jpg",
      "/images/port4.jpg",
      // "/images/port5.jpg",
      // "/images/port6.jpg",
    ],
  },
  {
    id: 2,
    name: "Dream Planners",
    rating: 4.7,
    price: "₹45,000",
    location: "Bangalore",
    image: "/images/photo2.jpg",
    phone: "+91 90123 45678",
    description: "Known for destination weddings and corporate summits.",
    portfolio: ["/images/pl1.jpg", "/images/pl2.jpg"],
  },
  {
    id: 3,
    name: "Perfect Moments",
    rating: 4.8,
    price: "₹60,000",
    location: "Mumbai",
    image: "/images/photo3.jpg",
    phone: "+91 93456 78120",
    description: "Known for destination weddings and corporate summits.",
    portfolio: ["/images/port8.jpg",
      "/images/port5.jpg",
      "/images/port6.jpg",],
   
  },
  {
    id: 4,
    name: "Royal Weddings & Events",
    rating: 4.6,
    price: "₹55,000",
    location: "Delhi",
    image: "/images/photo4.jpg",
    phone: "+91 97865 43120",
    description: "Known for destination weddings and corporate summits.",
    portfolio: ["/images/pl3.jpg", "/images/pl4.jpg"],
    
  },
];

const PlannerDetails = () => {
  const { id } = useParams();
  const planner = planners.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(null);

  if (!planner) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "#6b7280" }}>
        Planner not found
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "40px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
          position: "relative",
          paddingBottom: "12px",
        }}
      >
        <FaArrowLeft
          size={20}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#059669",
          }}
          onClick={() => window.history.back()}
        />
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "#1f2937",
            letterSpacing: "1px",
          }}
        >
          {planner.name}
        </h1>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          {planner.location} • Rated {planner.rating} ★
        </p>
      </header>

      {/* Main Info Section */}

      <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "32px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "50px",
    background: "linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)",
    borderRadius: "20px",
    padding: "30px 25px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
  }}
>
  {/* Left Image */}
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: "16px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
    }}
  >
    <img
      src={planner.image}
      alt={planner.name}
      style={{
        width: "340px",
        height: "240px",
        borderRadius: "16px",
        objectFit: "cover",
        transition: "transform 0.4s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    />
  </div>

  {/* Details Section */}
  <div
    style={{
      flex: 1,
      minWidth: "280px",
      background: "#ffffffcc",
      backdropFilter: "blur(6px)",
      borderRadius: "16px",
      padding: "20px 24px",
      boxShadow: "inset 0 0 10px rgba(255,255,255,0.5)",
    }}
  >
    <h2
      style={{
        fontSize: "1.6rem",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "12px",
      }}
    >
      {planner.name}
    </h2>

    <p
      style={{
        fontSize: "1rem",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#fbbf24",
      }}
    >
      <FaStar /> <strong>{planner.rating}</strong>
    </p>

    <p style={{ marginBottom: "8px", color: "#374151" }}>
      <strong style={{ color: "#059669" }}>Location:</strong> {planner.location}
    </p>

    <p style={{ marginBottom: "8px", color: "#374151" }}>
      <strong style={{ color: "#059669" }}>Price:</strong> {planner.price}
    </p>

    <p
      style={{
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#059669",
        fontWeight: 500,
      }}
    >
      <FaPhone /> {planner.phone}
    </p>

    <p
      style={{
        marginTop: "14px",
        color: "#4b5563",
        lineHeight: "1.6",
        fontSize: "0.96rem",
      }}
    >
      {planner.description}
    </p>

    {/* Fancy Divider */}
    <div
      style={{
        marginTop: "16px",
        height: "2px",
        width: "60%",
        background: "linear-gradient(to right, #059669, transparent)",
        borderRadius: "4px",
      }}
    />
  </div>
</div>


      {/* Portfolio Section */}
      <section>
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginBottom: "16px",
            color: "#1f2937",
            textAlign: "center",
          }}
        >
          Portfolio
        </h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            padding: "10px 0",
            scrollBehavior: "smooth",
          }}
        >
          {planner.portfolio.map((img, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 auto",
                position: "relative",
                width: "300px",
                height: "200px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector(".view-btn").style.opacity = 1)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector(".view-btn").style.opacity = 0)
              }
            >
              <img
                src={img}
                alt={`portfolio-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <button
                className="view-btn"
                onClick={() => setSelectedImage(img)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                View Photo
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Fullscreen Image */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <img
            src={selectedImage}
            alt="Large View"
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "12px",
              objectFit: "contain",
              boxShadow: "0 4px 20px rgba(255,255,255,0.2)",
            }}
          />
          <FaTimes
            size={28}
            color="#fff"
            style={{
              position: "absolute",
              top: "30px",
              right: "40px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedImage(null)}
          />
        </div>
      )}
    </div>
  );
};

export default PlannerDetails;
    