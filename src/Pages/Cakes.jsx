import React from "react";
import { FaStar, FaPhone } from "react-icons/fa";

const cakes = [
  {
    id: 1,
    name: "Sweet Delights Bakery",
    rating: 4.9,
    price: "₹2,000",
    location: "Hyderabad",
    image:
      "images/c1.jpg",
    phone: "+91 98765 44321",
  },
  {
    id: 2,
    name: "Cake Avenue",
    rating: 4.8,
    price: "₹1,800",
    location: "Bangalore",
    image:
      "images/c2.jpeg",
    phone: "+91 87654 33210",
  },
  {
    id: 3,
    name: "Sugar Bliss",
    rating: 4.7,
    price: "₹2,200",
    location: "Chennai",
    image:
      "images/c3.jpg",
    phone: "+91 91234 77654",
  },
  {
    id: 4,
    name: "The Cake Studio",
    rating: 4.6,
    price: "₹2,500",
    location: "Delhi",
    image:
      "images/c4.webp",
    phone: "+91 93456 22109",
  },
];

const ServiceCard = ({ service }) => (
  <div
    style={{
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <img
      src={service.image}
      alt={service.name}
      style={{ width: "100%", height: 180, objectFit: "cover" }}
    />
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
      <div
        style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "10px 12px",
        }}
      >
        <p style={{ margin: 0, fontSize: 14, color: "#374151" }}>
          <FaPhone style={{ marginRight: 6, color: "#059669" }} />
          Contact directly: <strong>{service.phone}</strong>
        </p>
      </div>
    </div>
  </div>
);

const Cakes = () => {
  return (
    <div className="cakes-page" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Delicious Cakes
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Order customized cakes for your special occasions — contact directly to
        discuss your design and flavor preferences.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {cakes.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Cakes;
