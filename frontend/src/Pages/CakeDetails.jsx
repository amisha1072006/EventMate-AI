import React from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaMapMarkerAlt, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cakes } from "./Cakes";

const CakeDetails = () => {
  const { id } = useParams();
  const cake = cakes.find((c) => c.id === Number(id));

  if (!cake)
    return <h2 style={{ textAlign: "center", marginTop: 100 }}>Cake not found!</h2>;

  // 🔹 Custom arrow components
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: 10,
        transform: "translateY(-50%)",
        background: "rgba(0,0,0,0.4)",
        color: "#fff",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 2,
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.7)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.4)")}
    >
      <FaChevronRight size={20} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        background: "rgba(0,0,0,0.4)",
        color: "#fff",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 2,
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.7)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.4)")}
    >
      <FaChevronLeft size={20} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleOrder = () => {
    const whatsappUrl = `https://wa.me/${cake.phone.replace(
      /[^0-9]/g,
      ""
    )}?text=Hi! I want to order a cake from ${cake.name}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "5px auto",
        backgroundColor: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        overflow: "hidden",
        padding: "30px 20px 50px",
        position: "relative",
      }}
    >
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#1f2937",
          textAlign: "center",
          marginBottom: 30,
          borderBottom: "2px solid #f3f4f6",
          paddingBottom: 10,
        }}
      >
        {cake.name}
      </h1>

      {/* 🖼️ Image Slider */}
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          maxWidth: 700,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Slider {...settings}>
          {cake.images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`${cake.name} ${idx + 1}`}
                style={{
                  width: "100%",
                  height: 320,
                  objectFit: "contain",
                  borderRadius: 12,
                  backgroundColor:"#f0f0f0",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 🍰 Cake Details */}
       
       <div>
        <p style={{ fontSize:18 , color: "#4b5563", maxWidth: 700, margin: "0 auto", marginTop: 20, marginBottom: 20 }}>
            {cake.description}
        </p>
                 <div style={{ 
          maxWidth: 700, 
          margin: "25px auto", 
          padding: "16px 20px", 
          background: "#f9fafb", // हल्का ग्रे बैकग्राउंड
          borderRadius: 12, 
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)" 
        }}>
          <h4 style={{ 
            margin: "0 0 10px", 
            fontSize: 18, 
            color: "#1f2937", // हेडिंग के लिए डार्क टेक्स्ट
            fontWeight: 600 
          }}>
            Available Flavours
          </h4>
          <p style={{ 
            fontSize: 16, 
            color: "#4b5563", 
            lineHeight: 1.6, 
            margin: 0 
          }}>
            {cake.flavour}
          </p>
        </div>
        
        <div style={{ display:"flex", justifyContent:"space-around" ,maxWidth: 700,  margin: "0 auto"  }}>
        <p style={{ fontSize: 18, color: "#4b5563",  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",  paddingLeft:20, paddingRight:20, borderRadius:8 }}>
          <FaMapMarkerAlt style={{ marginRight: 6, color: "#ef4444" }} />
          {cake.location}
        </p>
        <p style={{ fontSize: 18, color: "#374151" ,  boxShadow: "0 4px 20px rgba(0,0,0,0.1)", paddingLeft:20, paddingRight:20, borderRadius:8  }}>
          <FaStar style={{ color: "#fbbf24", marginRight: 6 }} />
          Rating: <strong>{cake.rating}</strong>
        </p>
        <p style={{ fontSize: 20, color: "#059669" ,  boxShadow: "0 4px 20px rgba(0,0,0,0.1)", paddingLeft:20, paddingRight:20 , borderRadius:8  }}>
          Price: <strong>{cake.price}</strong>
        </p>

        {/* 💬 Order Button */}
        </div>
    
        <button
          onClick={handleOrder}
          style={{
            background: "#25D366",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "14px 28px",
            fontSize: 17,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            margin: "0 auto",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#22c55e")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#25D366")}
        >
          <FaWhatsapp size={20} /> Order on WhatsApp
        </button>
      </div>


      
    

    </div>
  );
};

export default CakeDetails;
