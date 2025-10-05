import React from "react";
import { FaStar, FaPhone } from "react-icons/fa";

const photographers = [
  {
    id: 1,
    name: "Rajesh Photography",
    rating: 4.8,
    price: "₹25,000",
    location: "Delhi",
    image:
      "images/p1.jpg",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Sunil Photography",
    rating: 4.9,
    price: "₹35,000",
    location: "Mumbai",
    image:
      "images/p2.jpg",
    phone: "+91 87654 32109",
  },
  {
    id: 3,
    name: "Chandan Photography",
    rating: 4.7,
    price: "₹20,000",
    location: "Bangalore",
    image:
      "images/p3.webp",
    phone: "+91 76543 21098",
  },
  {
    id: 4,
    name: "Asutosh Photography",
    rating: 4.6,
    price: "₹30,000",
    location: "Lucknow",
    image:
      "images/p4.jpg",
    phone: "+91 65432 10987",
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

const Photographers = () => {
  return (
    <div className="photographers-page" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Our Photographers
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Explore professional photographers available for your events.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {photographers.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Photographers;
