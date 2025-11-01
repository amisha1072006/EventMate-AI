import React, { useState } from "react";
import { FaStar, FaPhone, FaWhatsapp, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

// === Sample Data ===
const planners = [
  {
    id: 1,
    name: "Priya Singh",
    rating: 4.9,
    price: "₹35,000",
    //location: "Hyderabad",
    //image: "images/photo1.jpg",
       // image: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg", 
           image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg", 


    // image : "https://raw.githubusercontent.com/Saurabh-devs/Event/c39058fe872d62b7a9bf3e6f690863bcfdec4481/public/images/photo1.png",
    // image : "https://raw.githubusercontent.com/Saurabh-devs/Event/c39058fe872d62b7a9bf3e6f690863bcfdec4481/public/images/1.png",
    call: "+91 91234 56780",
    whatsapp: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 4.7,
    price: "₹30,000",
    //location: "Bangalore",
    //image: "images/photo2.jpg",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    call: "+91 90123 45678",
    whatsapp: "+91 99887 66554",
  },
  {
    id: 3,
    name: "Himanshu Sharma",
    rating: 4.8,
    price: "₹20,000",
    // location: "Mumbai",
    image:"https://media.istockphoto.com/id/1412021265/photo/head-shot-portrait-smiling-bearded-man-looking-at-camera.jpg?s=2048x2048&w=is&k=20&c=M4dFUZwVsUEUfLi5ixFjubRgx2ly-QxV5llizOAz3rs=",
    call: "+91 93456 78120",
    whatsapp: "+91 99112 33445",
  },
  {
    id: 4,
    name: "Aakash Pandey",
    rating: 4.6,
    price: "₹25,000",
    //location: "Delhi",
    //image: "images/photo4.jpg",
        image:"https://media.istockphoto.com/id/1459185149/photo/portrait-of-young-man-shaking-head-as-yes-sign-approval.jpg?s=1024x1024&w=is&k=20&c=5bvev5LhMOH7ZCUO3jnPPCVkc0RwnMppRV0ncZZAW4Q=",

    call: "+91 97865 43120",
    whatsapp: "+91 90909 80808",
  },
];

// === Contact Section Component ===
const ContactSection = ({ callNumber, whatsappNumber }) => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div
      style={{
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "10px 12px",
        margin: 16,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setShowContacts(!showContacts)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 15,
          fontWeight: 600,
          color: "#059669",
          cursor: "pointer",
        }}
      >
        Contact Options
        {showContacts ? (
          <FaChevronUp style={{ color: "#059669" }} />
        ) : (
          <FaChevronDown style={{ color: "#059669" }} />
        )}
      </button>

      {/* Hidden contact details */}
      {showContacts && (
        <div style={{ marginTop: 12 }}>
          {/* Call Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
              gap: 10,
            }}
          >
            <FaPhone style={{ color: "#059669" }} />
            <span style={{ fontSize: 14, color: "#374151" }}>
              Call: <strong>{callNumber}</strong>
            </span>
            <a
              href={`tel:${callNumber.replace(/\s+/g, "")}`}
              style={{
                background: "#059669",
                color: "#fff",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              Call Now
            </a>
          </div>

          {/* WhatsApp Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FaWhatsapp style={{ color: "#25D366" }} />
            <span style={{ fontSize: 14, color: "#374151" }}>
              WhatsApp: <strong>{whatsappNumber}</strong>
            </span>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\s|\+|-/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "#fff",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              Chat Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// === Individual Service Card ===
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
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        paddingTop: "16px",
      }}
    >
      <img
        src={service.image}
        alt={service.name}
        style={{ width: "40%", height: 120, objectFit: "cover", borderRadius: 8 }}
      />
      <div style={{ width: "40%", height: 120 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
          <Link to={`/planner/${service.id}`} style={{ textDecoration: "none", color: "#111827" }}>
            {service.name}
          </Link>
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
      </div>
    </div>

    {/* Toggle Contact Section */}
    {/* <ContactSection callNumber={service.call} whatsappNumber={service.whatsapp} /> */}




<div  style={{ display: "flex", gap: "20px", marginTop: 15, padding: "0 16px 16px 16px" }}>
  {/* Call Button */}
  <a
    href="tel:+919876543210" // your call number
    style={{
      flex: 1,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#059669",
      color: "#fff",
      borderRadius: 8,
      padding: "10px 0",
      textDecoration: "none",
      fontWeight: 600,
    }}
  >
    <FaPhone style={{ marginRight: 6 }} /> Call
    {/* Badge */}
    <span
      style={{
        position: "absolute",
        top: -10,
        right: -6,
        background: "white",
        color: "#059669",
        borderRadius: "10px",
        padding: "2px 6px",
        fontSize: 10,
        fontWeight: 600,
        border : '1px solid gray',
      }}
    >
      +91 9045184372
    </span>
  </a>

  {/* WhatsApp Button */}
  <a
    href="https://wa.me/919812345678" // your WhatsApp number
    target="_blank"
    rel="noopener noreferrer"
    style={{
      flex: 1,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#25D366",
      color: "#fff",
      borderRadius: 8,
      padding: "10px 0",
      textDecoration: "none",
      fontWeight: 600,
    }}
  >
    WhatsApp
    {/* Badge */}
    <span
      style={{
        position: "absolute",
        top: -10,
        right: -6,
        background: "white",
        color: "#059669",
        borderRadius: "10px",
        padding: "2px 6px",
        fontSize: 10,
        fontWeight: 600,
        border : '1px solid gray',
      }}
    >
      +91 9045184372
    </span>
  </a>
</div>

 




  </div>
);

// === Main Page ===
const Planners = () => {
  return (
    <div className="planners-page" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Our Event Planners
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Find professional planners who can make your event unforgettable.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {planners.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Planners;
