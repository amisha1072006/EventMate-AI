import React from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaMapMarkerAlt, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { attires } from "./Attire";

const AttireDetails = () => {
  const { id } = useParams();
  const attire = attires.find((a) => a.id === Number(id));

  if (!attire) return <h2 style={{ textAlign: "center", marginTop: 100 }}>Attire not found!</h2>;

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
    const whatsappUrl = `https://wa.me/${attire.phone.replace(/[^0-9]/g, "")}?text=Hi! I want to order ${attire.name}`;
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
        {attire.name}
      </h1>

      {/* Image Slider */}
      <div style={{ borderRadius: 12, overflow: "hidden", maxWidth: 700, margin: "0 auto", position: "relative" }}>
        <Slider {...settings}>
          {attire.images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`${attire.name} ${idx + 1}`}
                style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 12 }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Details */}
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <p style={{ fontSize: 18, color: "#4b5563", marginBottom: 8 }}>
          <FaMapMarkerAlt style={{ marginRight: 6, color: "#ef4444" }} />
          {attire.location}
        </p>
        <p style={{ fontSize: 18, color: "#374151", marginBottom: 8 }}>
          <FaStar style={{ color: "#fbbf24", marginRight: 6 }} />
          Rating: <strong>{attire.rating}</strong>
        </p>
        <p style={{ fontSize: 20, color: "#059669", marginBottom: 20 }}>
          Price: <strong>{attire.price}</strong>
        </p>

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

export default AttireDetails;
