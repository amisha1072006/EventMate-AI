import React from "react";
import { FaStar, FaPhone, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
 
const photographers = [
  {
    className:"arrow-button",
    id: 1,
    name: "Riya Photographer",
    rating: 4.8,
    price: "₹28,000",
    //location: "Delhi",
    images: [
     // "images/p1.jpg",
     "images/photographer1.jpg",
      "images/photographer7.jpg",
      // "images/p2.jpg",
      // "images/p4.jpg",
    ],
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Rajesh Photographer",
    rating: 4.9,
    price: "₹35,000",
   // location: "Mumbai",
    images: [
      // "images/photographer1.jpg",
      // "images/photographer2.jpg",
      // "images/photographer3.jpg",
      // "images/photographer1.jpg",
      // "images/photographer7.jpg",
      "images/p2.jpg",
      "images/p4.jpg",
    ],
    phone: "+91 87654 32109",
  },
  {
    id: 3,
    name: "Chandan Photographer",
    rating: 4.7,
    price: "₹30,000",
   // location: "Bangalore",
    images: [
      "images/photographer4.jpg",
      //"images/photographer5.jpg",
      "images/photographer6.jpg",
    ],
    phone: "+91 76543 21098",
  },
  {
    id: 4,
    name: "Aashutosh Photographer",
    rating: 4.9,
    price: "₹40,000",
   // location: "Lucknow",
    images: [
      // "images/photographer7.jpg",
     // "images/photographer3.jpg",
     // "images/p2.jpg",
      // "images/photographer1.jpg",
       "images/photographer2.jpg",
      "images/photographer3.jpg",
    ],
    phone: "+91 65432 10987",
  },
];




const NextArrow = ({ onClick }) => (
  <div
  onClick={onClick}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
 
    borderRadius: "50%",
    padding: 10,
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    cursor: "pointer",
  }}
>
  <FaArrowRight style={{ color: "black" }} />
</div>

);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   
      borderRadius: "50%",
      padding: 10,
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
    }}
  >
    <FaArrowLeft style={{ color: "black" }} />
  </div>
);

const ServiceCard = ({ service }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <Slider {...settings}>
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
        {/* <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
          {service.name}
        </h3> */}
       
       <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
  <Link to={`/photographer/${service.id}`} style={{ textDecoration: 'none', color: 'black' }}>
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
    </div>
  );
};

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
