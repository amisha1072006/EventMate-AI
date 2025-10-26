import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const attires = [
  {
    id: 1,
    name: "Bridal Couture House",
    rating: 4.8,
    price: "₹75,000",
    location: "Delhi",
    images: ["/images/a1.jpg", "/images/a2.jpg"],
    phone: "+91 98765 43213",
  },
  {
    id: 2,
    name: "Designer Wedding Wear",
    rating: 4.9,
    price: "₹1,20,000",
    location: "Mumbai",
    images: ["/images/a3.webp", "/images/a4.webp"],
    phone: "+91 87654 32112",
  },
  {
    id: 3,
    name: "Elegant Bridal Studio",
    rating: 4.7,
    price: "₹90,000",
    location: "Bangalore",
    images: ["/images/a2.jpg", "/images/a1.jpg"],
    phone: "+91 76543 21101",
  },
  {
    id: 4,
    name: "Royal Wedding Attire",
    rating: 4.6,
    price: "₹85,000",
    location: "Lucknow",
    images: ["/images/a4.webp", "/images/a3.webp"],
    phone: "+91 65432 10990",
  },
  {
    id: 5,
    name: "Bridal Couture House",
    rating: 4.8,
    price: "₹75,000",
    location: "Delhi",
    images: ["/images/a4.jpg", "/images/a2.jpg"],
    phone: "+91 98765 43213",
  },
  {
    id: 6,
    name: "Designer Wedding Wear",
    rating: 4.9,
    price: "₹1,20,000",
    location: "Mumbai",
    images: ["/images/a15.jpg", "/images/a5.jpg"],
    phone: "+91 87654 32112",
  },
  {
    id: 7,
    name: "Elegant Bridal Studio",
    rating: 4.7,
    price: "₹90,000",
    location: "Bangalore",
    images: ["/images/a6.jpg", "/images/a1.jpg"],
    phone: "+91 76543 21101",
  },
  {
    id: 8,
    name: "Royal Wedding Attire",
    rating: 4.6,
    price: "₹85,000",
    location: "Lucknow",
    images: ["/images/a7.jpg", "/images/a16.jpg"],
    phone: "+91 65432 10990",
  },
  {
    id: 9,
    name: "Bridal Couture House",
    rating: 4.8,
    price: "₹75,000",
    location: "Delhi",
    images: ["/images/a17.jpg", "/images/a8.jpg"],
    phone: "+91 98765 43213",
  },
  {
    id: 10,
    name: "Designer Wedding Wear",
    rating: 4.9,
    price: "₹1,20,000",
    location: "Mumbai",
    images: ["/images/a18.jpg", "/images/a9.jpg"],
    phone: "+91 87654 32112",
  },
  {
    id: 11,
    name: "Elegant Bridal Studio",
    rating: 4.7,
    price: "₹90,000",
    location: "Bangalore",
    images: ["/images/a19.jpg", "/images/a10.jpg"],
    phone: "+91 76543 21101",
  },
  {
    id: 12,
    name: "Royal Wedding Attire",
    rating: 4.6,
    price: "₹85,000",
    location: "Lucknow",
    images: ["/images/a20.jpg", "/images/a11.jpg"],
    phone: "+91 65432 10990",
  },
  {
    id: 13,
    name: "Bridal Couture House",
    rating: 4.8,
    price: "₹75,000",
    location: "Delhi",
    images: ["/images/a12.jpg", "/images/a2.jpg"],
    phone: "+91 98765 43213",
  },
  {
    id: 14,
    name: "Designer Wedding Wear",
    rating: 4.9,
    price: "₹1,20,000",
    location: "Mumbai",
    images: ["/images/a13.jpg", "/images/a4.webp"],
    phone: "+91 87654 32112",
  },
  {
    id: 15,
    name: "Elegant Bridal Studio",
    rating: 4.7,
    price: "₹90,000",
    location: "Bangalore",
    images: ["/images/a14.jpg", "/images/a1.jpg"],
    phone: "+91 76543 21101",
  },
 
];

// Custom arrows for carousel
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="slick-arrow"
    style={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      background: "rgba(0,0,0,0.5)",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FaArrowRight style={{ color: "#d1d5db", fontSize: 20 }} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="slick-arrow"
    style={{
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      background: "rgba(0,0,0,0.5)",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FaArrowLeft style={{ color: "#d1d5db", fontSize: 20 }} />
  </div>
);

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleCardClick = (e) => {
    // Prevent navigation if user clicks on arrow or dot
    if (e.target.closest(".slick-arrow") || e.target.closest(".slick-dots")) return;
    navigate(`/attire/${service.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      <Slider {...sliderSettings}>
        {service.images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`${service.name} ${index + 1}`}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>

      <div style={{ padding: 16 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
          {service.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <FaStar style={{ color: "#fbbf24", marginRight: 4 }} />
          <span style={{ fontSize: 14, color: "#555" }}>{service.rating}</span>
          <span style={{ margin: "0 8px", color: "#ccc" }}>•</span>
          <span style={{ fontSize: 14, color: "#555" }}>{service.location}</span>
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#059669",
            marginBottom: 12,
          }}
        >
          {service.price}
        </div>

        <a
          href={`https://wa.me/${service.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            background: "#059669",
            color: "#fff",
            padding: "12px 0",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Order Now
        </a>
      </div>
    </div>
  );
};

const Attire = () => {
  return (
    <div className="attire-page" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Wedding Attire
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Explore beautiful wedding outfits for brides and grooms — click on any attire to see details and order via WhatsApp.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {attires.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Attire;
