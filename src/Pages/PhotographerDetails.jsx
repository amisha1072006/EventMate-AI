
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaPhone, FaCalendar, FaClock, FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";


export const photographers = [
  {
    id: 1,
    name: "Rajesh Photography",
    rating: 4.8,
    price: "₹25,000",
    location: "Delhi",
    images: ["/images/photo1.jpg", "/images/p2.jpg", "images/p4.jpg"],
    phone: "+91 98765 43210",
    description: "Specializes in wedding and corporate photography.",
    portfolio: [ 
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
       
      "/images/port1.jpg",
      "/images/port2.jpg",
      "/images/port3.jpg",
      "/images/port4.jpg",
      "/images/port5.jpg",
      "/images/port6.jpg",


    ],
    social: {
        facebook: "https://facebook.com/rajeshphotography",
        instagram: "https://instagram.com/rajesh_photography",
        twitter: "https://twitter.com/rajeshphoto"
      },
    services: [
      {
        name: "Basic Wedding Package",
        duration: "6 hours",
        includes: ["1 photographer", "Digital album"],
        price: "₹15,000",
      },
      {
        name: "Premium Engagement Shoot",
        duration: "10 hours",
        includes: ["1 photographer", "50 edited photos", "Print release"],
        price: "₹25,000",
      },
      {
        name: "Luxury Full-Day",
        duration: "10 hours",
        includes: ["2 photographers", "Premium album", "Drone footage"],
        price: "₹35,000",
      }
    ],
    about:
      "With over 10 years of experience in wedding photography, I aim to capture the most precious moments of your special day. My approach combines artistic vision with technical expertise to create timeless memories that you'll cherish forever.",
    workingHours: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: 2,
    name: "Sunil Photography",
    rating: 4.9,
    price: "₹35,000",
    location: "Mumbai",
    images: ["/images/p2.jpg", "images/p3.webp", "images/p4.jpg"],
    phone: "+91 87654 32109",
    description: "Expert in event and portrait photography.",
    portfolio: [
      "/images/port1.jpg",
      "/images/port2.jpg",
      "/images/port3.jpg",
      "/images/port4.jpg",
      "/images/port5.jpg",
      "/images/port6.jpg",
    ],
    services: [
      {
        name: "Portrait Session",
        duration: "2 hours",
        includes: ["1 photographer", "15 edited photos", "Online gallery"],
        price: "₹8,000",
      },
      {
        name: "Event Coverage",
        duration: "6 hours",
        includes: ["1 photographer", "50 edited photos", "Print release"],
        price: "₹20,000",
      },
    ],
    about:
      "Specializing in portrait and event photography with a creative approach to storytelling through images.",
    workingHours: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
  },
  {
    id: 3,
    name: "Sunil Photography",
    rating: 4.9,
    price: "₹35,000",
    location: "Mumbai",
    images: ["/images/p2.jpg", "images/p3.webp", "images/p4.jpg"],
    phone: "+91 87654 32109",
    description: "Expert in event and portrait photography.",
    portfolio: [
      "/images/port1.jpg",
      "/images/port2.jpg",
      "/images/port3.jpg",
      "/images/port4.jpg",
      "/images/port5.jpg",
      "/images/port6.jpg",
    ],
    services: [
      {
        name: "Portrait Session",
        duration: "2 hours",
        includes: ["1 photographer", "15 edited photos", "Online gallery"],
        price: "₹8,000",
      },
      {
        name: "Event Coverage",
        duration: "6 hours",
        includes: ["1 photographer", "50 edited photos", "Print release"],
        price: "₹20,000",
      },
    ],
    about:
      "Specializing in portrait and event photography with a creative approach to storytelling through images.",
    workingHours: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
  },
  {
    id: 4,
    name: "Sunil Photography",
    rating: 4.9,
    price: "₹35,000",
    location: "Mumbai",
    images: ["/images/p2.jpg", "images/p3.webp", "images/p4.jpg"],
    phone: "+91 87654 32109",
    description: "Expert in event and portrait photography.",
    portfolio: [
      "/images/port1.jpg",
      "/images/port2.jpg",
      "/images/port3.jpg",
      "/images/port4.jpg",
      "/images/port5.jpg",
      "/images/port6.jpg",
    ],
    services: [
      {
        name: "Portrait Session",
        duration: "2 hours",
        includes: ["1 photographer", "15 edited photos", "Online gallery"],
        price: "₹8,000",
      },
      {
        name: "Event Coverage",
        duration: "6 hours",
        includes: ["1 photographer", "50 edited photos", "Print release"],
        price: "₹20,000",
      },
    ],
    about:
      "Specializing in portrait and event photography with a creative approach to storytelling through images.",
    workingHours: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
  },
];

const PhotographerPortfolio = ({ photographer }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 24,
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: 8,
          color: "#1f2937",
        }}
      >
        Portfolio
      </h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          padding: "16px 4px 24px 4px",
          scrollbarWidth: "thin",
          cursor: "grab",
          position: "relative",
        }}
      >
        {photographer.portfolio.map((img, idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              flexShrink: 0,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <img
              src={img}
              alt={`portfolio-${idx}`}
              style={{
                width: 300,
                height: 200,
                objectFit: "cover",
              }}
              onClick={() => setSelectedImage(img)}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              onClick={() => setSelectedImage(img)}
            >
              View Photo
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Large view"
            style={{
              maxWidth: "90%",
              maxHeight: "85%",
              borderRadius: 10,
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              objectFit: "contain",
            }}
          />
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 30,
              fontSize: 32,
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

const PhotographerDetails = () => {
  const { id } = useParams();
  const photographer = photographers.find((p) => p.id === parseInt(id));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!photographer)
    return <h2 style={{ textAlign: "center", marginTop: 50 }}>Photographer not found</h2>;

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const calendar = [];
    let currentWeek = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      currentWeek.push(currentDate);
      if (currentWeek.length === 7) {
        calendar.push(currentWeek);
        currentWeek = [];
      }
    }
    return calendar;
  };

  const today = new Date();
  const isDateAvailable = (date) =>
    date >= today && date <= new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const isDateSelected = (date) =>
    selectedDate && date.toDateString() === selectedDate.toDateString();

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime("");
    }
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Booking confirmed!\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}`);
    } else {
      alert("Please select both date and time");
    }
  };

  const calendar = generateCalendar(currentMonth);
  const monthNames = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
  ];

  return (
    <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Header Section */}   
  <div
  style={{
    display: "flex",
    gap: 32,
    marginBottom: 50,
    flexWrap: "wrap",
    background: "linear-gradient(to right, #ffffff, #f8fafc)",
    padding: 24,
    borderRadius: 16,
    boxShadow:
      "0 10px 20px -5px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.05)",
    alignItems: "center",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow =
      "0 15px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 20px -5px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.05)";
  }}
>
  {/* Photographer Image */}
  <div
    style={{
      position: "relative",
      borderRadius: 16,
      overflow: "hidden",
      width: 320,
      height: 220,
      flexShrink: 0,
    }}
  >
    <img
      src={photographer.images[0]}
      alt={photographer.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.4s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    />
    {/* Subtle overlay gradient */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.5), transparent 80%)",
      }}
    />
  </div>

  {/* Photographer Info */}
  <div style={{ flex: 1, minWidth: 300 }}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: 800,
        marginBottom: 12,
        background:
          "linear-gradient(90deg, #16a34a, #065f46)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {photographer.name}
    </h1>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        color: "#374151",
      }}
    >
      <FaStar color="#fbbf24" size={18} />
      <span style={{ fontWeight: 600, fontSize: 16 }}>
        {photographer.rating} / 5.0
      </span>
      <span style={{ color: "#9ca3af", fontSize: 14 }}>
        • {photographer.location}
      </span>
    </div>

    <p
      style={{
        marginBottom: 6,
        fontSize: 15,
        color: "#374151",
      }}
    >
      <strong style={{ color: "#111827" }}>Starting Price:</strong>{" "}
      <span style={{ color: "#059669", fontWeight: 600 }}>
        {photographer.price}
      </span>
    </p>

    <p
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        color: "#374151",
      }}
    >
      <FaPhone color="#059669" />
      <span
        style={{
          fontWeight: 600,
          letterSpacing: 0.5,
          fontSize: 15,
        }}
      >
        {photographer.phone}
      </span>
    </p>

    <p
      style={{
        marginTop: 10,
        fontSize: 15,
        lineHeight: 1.6,
        color: "#4b5563",
        maxWidth: 600,
      }}
    >
      {photographer.description}
    </p>

    {/* Quick Action Buttons */}
    <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <button
        style={{
          backgroundColor: "#059669",
          color: "white",
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#047857")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
      >
        Book Now
      </button>
      <button
        style={{
          backgroundColor: "#f3f4f6",
          color: "#111827",
          padding: "10px 20px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          cursor: "pointer",
          fontWeight: 600,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#e5e7eb";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f3f4f6";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        View Portfolio
      </button>
    </div>
  </div>
</div>


      {/* Portfolio Section */}
      <PhotographerPortfolio photographer={photographer} />

      {/* Services Section */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Services & Packages</h2>
        <div style={{ display: "grid", gap: 20 }}>
          {photographer.services.map((service, index) => (
            <div key={index} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{service.name}</h3>
                <span style={{ color: "#059669", fontWeight: 700 }}>{service.price}</span>
              </div>
              <p><strong>Duration:</strong> {service.duration}</p>
              {service.includes.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FaCheck color="#059669" /> {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>About {photographer.name.split(" ")[0]}</h2>
        <p style={{ backgroundColor: "#f8f9fa", padding: 24, borderRadius: 12 }}>{photographer.about}</p>
      </section>











      {/* Booking Section */}
      {/* (Keep your calendar & time selection code as is) */}
          {/* Availability & Booking Section */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, borderBottom: "2px solid #e5e7eb", paddingBottom: 8 }}>
                Availability & Booking
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
                {/* Interactive Calendar */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FaCalendar color="#059669" />
                      <span style={{ fontWeight: 600 }}>Select Date & Time</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button 
                        onClick={prevMonth}
                        style={{ 
                          border: "none", 
                          background: "none", 
                          cursor: "pointer",
                          padding: "8px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                      >
                        <FaArrowLeft size={16} color="#374151" />
                      </button>
                      <span style={{ fontWeight: 600, minWidth: 150, textAlign: "center" }}>
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </span>
                      <button 
                        onClick={nextMonth}
                        style={{ 
                          border: "none", 
                          background: "none", 
                          cursor: "pointer",
                          padding: "8px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                      >
                        <FaArrowRight size={16} color="#374151" />
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ 
                    border: "1px solid #e5e7eb", 
                    borderRadius: 12, 
                    overflow: "hidden",
                    backgroundColor: "white",
                    marginBottom: 20
                  }}>
                    {/* Week days header */}
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(7, 1fr)", 
                      backgroundColor: "#f8f9fa",
                      borderBottom: "1px solid #e5e7eb"
                    }}>
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div 
                          key={index}
                          style={{ 
                            padding: "12px 8px", 
                            textAlign: "center", 
                            fontWeight: 600,
                            fontSize: 14,
                            color: "#374151"
                          }}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar days */}
                    {calendar.map((week, weekIndex) => (
                      <div 
                        key={weekIndex}
                        style={{ 
                          display: "grid", 
                          gridTemplateColumns: "repeat(7, 1fr)",
                          borderBottom: weekIndex < calendar.length - 1 ? "1px solid #e5e7eb" : "none"
                        }}
                      >
                        {week.map((date, dateIndex) => {
                          const available = isDateAvailable(date);
                          const selected = isDateSelected(date);
                          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                          
                          return (
                            <div 
                              key={dateIndex}
                              onClick={() => handleDateSelect(date)}
                              style={{ 
                                padding: "12px 8px", 
                                textAlign: "center",
                                backgroundColor: selected ? "#059669" : "white",
                                color: selected ? "white" : 
                                      !isCurrentMonth ? "#d1d5db" :
                                      available ? "#374151" : "#d1d5db",
                                fontWeight: selected ? 600 : 400,
                                cursor: available ? "pointer" : "not-allowed",
                                borderRight: dateIndex < 6 ? "1px solid #e5e7eb" : "none",
                                transition: "all 0.2s",
                                position: "relative"
                              }}
                              onMouseEnter={(e) => {
                                if (available && !selected) {
                                  e.target.style.backgroundColor = "#f0fdf4";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (available && !selected) {
                                  e.target.style.backgroundColor = "white";
                                }
                              }}
                            >
                              {date.getDate()}
                              {available && !selected && (
                                <div style={{
                                  position: "absolute",
                                  bottom: 2,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  width: 4,
                                  height: 4,
                                  backgroundColor: "#059669",
                                  borderRadius: "50%"
                                }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
      
                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <FaClock color="#059669" />
                        <span style={{ fontWeight: 600 }}>Available Time Slots for {selectedDate.toDateString()}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {photographer.workingHours.map((time, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTime(time)}
                            style={{
                              padding: "12px 16px",
                              border: `2px solid ${selectedTime === time ? "#059669" : "#e5e7eb"}`,
                              borderRadius: 8,
                              backgroundColor: selectedTime === time ? "#f0fdf4" : "white",
                              color: selectedTime === time ? "#059669" : "#374151",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              if (selectedTime !== time) {
                                e.target.style.borderColor = "#059669";
                                e.target.style.backgroundColor = "#f0fdf4";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedTime !== time) {
                                e.target.style.borderColor = "#e5e7eb";
                                e.target.style.backgroundColor = "white";
                              }
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>


                {/* Booking Summary */}
                <div style={{ 
                  border: "1px solid #e5e7eb", 
                  borderRadius: 12, 
                  padding: 24,
                  backgroundColor: "white",
                  position: "sticky",
                  top: 20
                }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Booking Summary</h3>
                  
                  {selectedDate && (
                    <div style={{ marginBottom: 20, padding: 16, backgroundColor: "#f0fdf4", borderRadius: 8 }}>
                      <p style={{ margin: "4px 0", fontWeight: 600 }}>Selected Date:</p>
                      <p style={{ margin: "4px 0", color: "#059669" }}>{selectedDate.toDateString()}</p>
                      {selectedTime && (
                        <>
                          <p style={{ margin: "4px 0", fontWeight: 600, marginTop: 8 }}>Selected Time:</p>
                          <p style={{ margin: "4px 0", color: "#059669" }}>{selectedTime}</p>
                        </>
                      )}
                    </div>
                  )}
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Event Type</label>
                      <select style={{ 
                        width: "100%", 
                        padding: "12px", 
                        border: "1px solid #d1d5db", 
                        borderRadius: 8,
                        fontSize: 16
                      }}>
                        <option>Wedding</option>
                        <option>Engagement</option>
                        <option>Portrait</option>
                        <option>Corporate Event</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Message</label>
                      <textarea 
                        style={{ 
                          width: "100%", 
                          padding: "12px", 
                          border: "1px solid #d1d5db", 
                          borderRadius: 8,
                          fontSize: 16,
                          minHeight: 100,
                          resize: "vertical"
                        }}
                        placeholder="Tell us about your event and any specific requirements..."
                      />
                    </div>
                    
                    <button 
                      onClick={handleBooking}
                      style={{
                        backgroundColor: selectedDate && selectedTime ? "#059669" : "#9ca3af",
                        color: "white",
                        border: "none",
                        padding: "14px 24px",
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: selectedDate && selectedTime ? "pointer" : "not-allowed",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        if (selectedDate && selectedTime) {
                          e.target.style.backgroundColor = "#047857";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedDate && selectedTime) {
                          e.target.style.backgroundColor = "#059669";
                        }
                      }}
                    >
                      {selectedDate && selectedTime ? "Confirm Booking" : "Select Date & Time"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
      
        
      
            {/* Social Icons */}
              {/* Social Icons */}
<div style={{
  display: "flex",
  gap: 16,
  justifyContent: "center",
  padding: "20px 0",
}}>
  {photographer.social?.facebook && (
    <a
      href={photographer.social.facebook}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: "#4267B2",
        borderRadius: "50%",
        color: "white",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <FaFacebookF size={18} />
    </a>
  )}

  {photographer.social?.instagram && (
    <a
      href={photographer.social.instagram}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        background:
          "radial-gradient(circle at 30% 30%, #f58529, #dd2a7b, #8134af, #515bd4)",
        borderRadius: "50%",
        color: "white",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <FaInstagram size={18} />
    </a>
  )}

  {photographer.social?.twitter && (
    <a
      href={photographer.social.twitter}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: "#1DA1F2",
        borderRadius: "50%",
        color: "white",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <FaTwitter size={18} />
    </a>
  )}
</div>

    </div>
  );
};

export default PhotographerDetails;
