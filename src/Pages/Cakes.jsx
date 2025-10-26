import React from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";


export const cakes = [
  {
    id: 1,
    name: "Sweet Delights Bakery",
    rating: 4.9,
    price: "₹2,000",
    location: "Hyderabad",
    images: ["/images/c1.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+919876544321",
    description: "Sweet Delights Bakery is known for its exquisite cakes and pastries. We specialize in custom-designed cakes for birthdays, weddings, and special events. Every cake is freshly baked using high-quality ingredients."
  },
  {
    id: 2,
    name: "Cake Avenue",
    rating: 4.8,
    price: "₹1,800",
    location: "Bangalore",
    images: ["/images/cake1.jpg", "/images/cake2.jpg", "/images/cake3.webp"],
    phone: "+918765433210",
    description: "Cake Avenue offers a delightful selection of cakes, cupcakes, and desserts. We focus on creating delicious and visually appealing cakes that make every celebration memorable."
  },
  {
    id: 3,
    name: "Sugar Bliss",
    rating: 4.7,
    price: "₹2,200",
    location: "Chennai",
    images: ["/images/cake4.jpg", "/images/cake5.jpg", "/images/c1.jpg"],
    phone: "+919123477654",
    description: "Sugar Bliss is your go-to place for premium cakes and baked treats. We combine classic recipes with modern flavors, ensuring every bite is a blissful experience."
  },
  {
    id: 4,
    name: "The Cake Studio",
    rating: 4.6,
    price: "₹2,500",
    location: "Delhi",
    images: ["/images/c3.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+919345622109",
    description: "The Cake Studio creates artistic cakes that are as beautiful as they are delicious. From intricate wedding cakes to personalized birthday cakes, we make every cake a masterpiece."
  },
  {
    id: 5,
    name: "Heavenly Bites",
    rating: 4.8,
    price: "₹2,100",
    location: "Mumbai",
    images: ["/images/cake5.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+919876543210",
    description: "Heavenly Bites specializes in decadent chocolate and fruit cakes. Our handcrafted treats bring joy to every occasion, and we pride ourselves on quality and presentation."
  },
  {
    id: 6,
    name: "Choco Charm",
    rating: 4.5,
    price: "₹1,900",
    location: "Pune",
    images: ["/images/cake6.jpg", "/images/cake2.jpg", "/images/cake3.webp"],
    phone: "+918765432109",
    description: "Choco Charm is a paradise for chocolate lovers. We offer rich chocolate cakes, truffles, and ganache delights. Every creation is made with passion and love for chocolate."
  },
  {
    id: 7,
    name: "Frost & Flavors",
    rating: 4.7,
    price: "₹2,300",
    location: "Kolkata",
    images: ["/images/cake7.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+919123456789",
    description: "Frost & Flavors is famous for its creamy, flavorful cakes and custom designs. We cater to weddings, birthdays, and corporate events with unique, hand-decorated cakes."
  },
  {
    id: 8,
    name: "The Dessert Hub",
    rating: 4.6,
    price: "₹2,000",
    location: "Ahmedabad",
    images: ["/images/cake8.jpg", "/images/cake5.jpg", "/images/c1.jpg"],

    phone: "+919876512345",
    description: "The Dessert Hub offers a wide range of cakes, muffins, and pastries. Our cakes are baked fresh daily using premium ingredients, making every bite a delightful experience."
  },
  {
    id: 9,
    name: "Cakelicious",
    rating: 4.9,
    price: "₹2,400",
    location: "Chandigarh",
    images: ["/images/cake9.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+918765498321",
    description: "Cakelicious is all about innovation and taste. From customized theme cakes to classic favorites, we ensure that each cake is both visually stunning and delicious."
  },
  {
    id: 10,
    name: "Blissful Bakes",
    rating: 4.8,
    price: "₹2,200",
    location: "Jaipur",
    images: ["/images/cake10.jpg", "/images/cake2.jpg", "/images/cake3.webp"],
    phone: "+919123498765",
    description: "Blissful Bakes focuses on premium quality and exquisite flavors. Our specialty cakes and desserts are perfect for celebrations, bringing sweetness and joy to every moment."
  },
  {
    id: 3,
    name: "Sugar Bliss",
    rating: 4.7,
    price: "₹2,200",
    location: "Chennai",
    images: ["/images/cake12.jpg", "/images/cake5.jpg", "/images/c1.jpg"],
    phone: "+919123477654",
    description: "Sugar Bliss is your go-to place for premium cakes and baked treats. We combine classic recipes with modern flavors, ensuring every bite is a blissful experience."
  },
  {
    id: 4,
    name: "The Cake Studio",
    rating: 4.6,
    price: "₹2,500",
    location: "Delhi",
    images: ["/images/cake13.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+919345622109",
    description: "The Cake Studio creates artistic cakes that are as beautiful as they are delicious. From intricate wedding cakes to personalized birthday cakes, we make every cake a masterpiece."
  },
  {
    id: 5,
    name: "Heavenly Bites",
    rating: 4.8,
    price: "₹2,100",
    location: "Mumbai",
    images: ["/images/cake14.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+919876543210",
    description: "Heavenly Bites specializes in decadent chocolate and fruit cakes. Our handcrafted treats bring joy to every occasion, and we pride ourselves on quality and presentation."
  },
  {
    id: 6,
    name: "Choco Charm",
    rating: 4.5,
    price: "₹1,900",
    location: "Pune",
    images: ["/images/cake15.jpg", "/images/cake2.jpg", "/images/cake3.webp"],
    phone: "+918765432109",
    description: "Choco Charm is a paradise for chocolate lovers. We offer rich chocolate cakes, truffles, and ganache delights. Every creation is made with passion and love for chocolate."
  },
  {
    id: 7,
    name: "Frost & Flavors",
    rating: 4.7,
    price: "₹2,300",
    location: "Kolkata",
    images: ["/images/cake16.jpg", "/images/c2.jpeg", "/images/c3.jpg"],
    phone: "+919123456789",
    description: "Frost & Flavors is famous for its creamy, flavorful cakes and custom designs. We cater to weddings, birthdays, and corporate events with unique, hand-decorated cakes."
  },
];


const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // ✅ added arrows
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleOrder = (e) => {
    e.stopPropagation();
    const whatsappUrl = `https://wa.me/${service.phone.replace(
      /[^0-9]/g,
      ""
    )}?text=Hi! I'm interested in ordering a cake from ${service.name}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      onClick={() => navigate(`/cakes/${service.id}`)}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      {/* ✅ Image Carousel */}
      <div onClick={(e) => e.stopPropagation()}>
        <Slider {...settings}>
          {service.images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`${service.name} ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "220px", // ✅ fixed height
                  objectFit: "cover", // ✅ ensures consistent size even for big images
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

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

        <button
          onClick={handleOrder}
          style={{
            width: "100%",
            background: "#25D366",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 0",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#22c55e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#25D366")}
        >
          Order Now 
        </button>
      </div>
    </div>
  );
};

// ✅ Custom Arrows for Carousel
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: 10,
        zIndex: 2,
        background: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: 10,
        zIndex: 2,
        background: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

const Cakes = () => {
  return (
    <div className="cakes-page" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        🍰 Delicious Cakes
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
