import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaPhone, FaCalendar, FaClock, FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";


export const photographers = [
  {
    id: 1,
    name: "Riya Photography",
    rating: 4.8,
    price: "₹28,000",
    //location: "Delhi",
    images: ["https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=600", "/images/p2.jpg", "images/p4.jpg"],
    phone: "+91 98765 43210",
    description: "Specializes in wedding and corporate photography.",
    eventTypes:["Wedding","Corporate Event"],
    portfolio: [ 
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
      // "/images/p1.jpg","/images/p2.jpg","/images/p4.jpg",
       
     "https://media.istockphoto.com/id/1399000012/photo/guests-throwing-confetti-over-bride-and-groom-as-they-walk-past-after-their-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=G8zuGJUuEK9HXwx1xEYPYwrcajt8r3K8nSVFeEzLHFY=",//couple
     "https://media.istockphoto.com/id/1190043570/photo/happy-wedding-photography-of-bride-and-groom-at-wedding-ceremony-wedding-tradition-sprinkled.jpg?s=1024x1024&w=is&k=20&c=dEnXwMGSpfySpEepRWDVY_c7pHyhOZpv2RG5_QggqzY=",
      "https://media.istockphoto.com/id/1397574789/photo/together-we-make-the-world-better.jpg?s=1024x1024&w=is&k=20&c=8caxy0OpDGOc5qA-M-JpMN4cxVMOFJrXgfOASXk43Qo=",
      "https://media.istockphoto.com/id/2195984095/photo/indian-couples-holding-hands-close-up.jpg?s=2048x2048&w=is&k=20&c=aRpmdV_vJO-e59HPzOgeYtMfOzjOKL9vFxMuE9k0Gyo=",
          // for planner "https://media.istockphoto.com/id/2196163507/photo/elegant-dining-setup-with-candles-at-night-in-a-stylish-restaurant.jpg?s=2048x2048&w=is&k=20&c=2YG3kbrnchhLrKITLAeb4l2vOB9W45xHMpbXGPFLR8U=",
  // planner   "https://media.istockphoto.com/id/2183824556/photo/three-candles-on-a-candlestick-burning-at-a-party.jpg?s=1024x1024&w=is&k=20&c=VBBFeOf2AlQFYWiNnRhFC4zjppxfb_H4yNhf4yKTQuc=",
  // "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=",
  //"https://media.istockphoto.com/id/1133692578/photo/exhibition-event-hall-blur-background-of-trade-show-business-world-or-international-expo.jpg?s=2048x2048&w=is&k=20&c=YTnHhSaD9oWH-QWORQ1V8iPxsTwug3msm4VGGReVrlo=",
         "https://media.istockphoto.com/id/2200874881/photo/loving-groom-looking-at-bride-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=NnZkm8DnV2igmuuMx1APvrY7z1HO1nKiog0ADQM7hQs=",
         "https://media.istockphoto.com/id/2200577335/photo/happy-bride-showing-bangles-to-groom-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=P0t0fbgKxykXhksxFluDRFriFVDa54ycV171ylyboGw=",
         "https://media.istockphoto.com/id/821463698/photo/microphone-over-the-abstract-blurred-photo-of-conference-hall-or-seminar-room-with-attendee.jpg?s=1024x1024&w=is&k=20&c=nQMCyAx-XkqX69RolGa2THHi8XJSdthHdZ9izvArrcc=",
   
        
    ],
    // social: {
    //     facebook: "https://facebook.com/rajeshphotography",
    //     instagram: "https://instagram.com/rajesh_photography",
    //     twitter: "https://twitter.com/rajeshphoto"
    //   },
    services: [
      {
        name: "Basic Wedding Package",
        duration: "10 hours",
        includes: ["1 photographer", "Digital album"],
        price: "₹25,000",
      },
      {
        name: "Premium Corporate Shoot",
        duration: "6 hours",
        includes: ["1 photographer", "50 edited photos", "Print release"],
        price: "₹20,000",
      },
      // {
      //   name: "Luxury Full-Day",
      //   duration: "10 hours",
      //   includes: ["2 photographers", "Premium album", "Drone footage"],
      //   price: "₹35,000",
      // }
    ],
    about:
      "With over 10 years of experience in wedding and corporate photography, I aim to capture the most precious moments of your special day. My approach combines artistic vision with technical expertise to create timeless memories that you'll cherish forever.",
    workingHours: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM","9:00pm","10:00 PM","11:00 PM","12:00 PM"],
  },
  {
    id: 2,
    name: "Rajesh Photography",
    rating: 4.9,
    price: "₹35,000",
    eventTypes:[" Corporate Event" ,"Portrait"],
    //location: "Mumbai",
    images: ["https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600", "/images/p2.jpg", "images/p4.jpg"],
    phone: "+91 87654 32109",
    description: "Expert in Corporate event and portrait photography.",
    portfolio: [
      "https://media.istockphoto.com/id/1187919612/photo/commitment.jpg?s=2048x2048&w=is&k=20&c=vTG_PHFWQuG2cOKhC94Umf22os5SYYlqIBdA84oC5n0=",
          "https://media.istockphoto.com/id/893123282/photo/wedding-champagne-toast-stock-image.jpg?s=2048x2048&w=is&k=20&c=Mt9OAW6_IvMQKyuf9GtMzyjlHGt45nfIFhvdKpRnAMo=",
                   "https://media.istockphoto.com/id/486879530/photo/happy-indian-couple-at-their-wedding.jpg?s=2048x2048&w=is&k=20&c=fzH7OAy9tuPnvsiUqfz8bzO5kOWcLrJuCr_McSbYPF8=",
         "https://media.istockphoto.com/id/1454343788/photo/closeup-of-the-groom-and-the-bride-holding-hands-during-a-traditional-indian-wedding.jpg?s=2048x2048&w=is&k=20&c=vNxV-p1JuGUn-DePdtcrNXDzqr1cvpDugaJpIjfGQmA=",
          "https://media.istockphoto.com/id/521046338/photo/bokeh-light-and-blurred-people-in-convention-hall.jpg?s=2048x2048&w=is&k=20&c=CLcOXz6g37siDoh5DSUNc-RH3wY7moz1oIJuxnhxKj4=",
      "/images/port2.jpg",
      "/images/port3.jpg",
      
    
      
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
    name: "Chandan Photography",
    rating: 4.7,
    price: "₹30,000",
    eventTypes:["Engagement","Wedding","Bday"],
    //location: "Mumbai",
    images: ["/images/photographer6.jpg"],

    phone: "+91 56654 22109",
    description: "Expert in engagement,wedding and bday photography.",
    portfolio: [
       "https://media.istockphoto.com/id/1215683644/photo/friends-celebration-birthday-with-cake.jpg?s=2048x2048&w=is&k=20&c=WhEZeIT2eG2cmIPO1o5WNYXudRjOEK3nTiqMOtzw_GA=",
        "https://media.istockphoto.com/id/1173607293/photo/100-years-old-birthday-cake-to-old-woman.jpg?s=2048x2048&w=is&k=20&c=dlpQ5XkT9v_NFA7icrN9F5wBxJEknxJt1tJhAaH-LGQ=",
         "https://media.istockphoto.com/id/1002144354/photo/friends-presenting-birthday-cake-to-girl.jpg?s=2048x2048&w=is&k=20&c=FAr-blR20QVjKvgDdwOXMb7LFntO3I6oH1YMrEJGnhc=",
          // "https://media.istockphoto.com/id/996257874/photo/wedding-table-with-flower-compositions.jpg?s=1024x1024&w=is&k=20&c=Prx9f4FEJvBNgJR7F1VKgzmgc3fIMqWRCFoNLsvUbbM=",
  //"https://media.istockphoto.com/id/2172827084/photo/beautiful-wedding-setty-back-with-floral-decorations.jpg?s=1024x1024&w=is&k=20&c=DmMETIVIcn7AHyXe0NKy6OVjlnTfrVDBbnsWyYQxTDQ=",
        "/images/port4.jpg",
        // "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=",
  //"https://media.istockphoto.com/id/2172827163/photo/wedding-setty-back-with-floral-decorations.jpg?s=2048x2048&w=is&k=20&c=B90kHcL20hk_-VMNysUVCfyycsxS5Y1vT9022iMENPA=",
"https://media.istockphoto.com/id/1468883993/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=2048x2048&w=is&k=20&c=L0IwnX99DKP_NOnp8pWWJnvZJhRBeyVhi3ZeRr3Ztfc=",
         "https://media.istockphoto.com/id/1211496765/photo/indian-bride-hands-with-henna-tattoo-ready-for-traditional-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=FZr2GQ7GPzPg8qun-Y-TdAm9YcZ9UY6FHZn7lj7ZcLc=",
    "https://media.istockphoto.com/id/1454343788/photo/closeup-of-the-groom-and-the-bride-holding-hands-during-a-traditional-indian-wedding.jpg?s=2048x2048&w=is&k=20&c=vNxV-p1JuGUn-DePdtcrNXDzqr1cvpDugaJpIjfGQmA=",
         
"https://media.istockphoto.com/id/2200874372/photo/loving-groom-and-bride-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=3-yzOCjE4tgRJbmsZjpWEKneJYqRmXd4c_oZ7LSNGHE=",
    
"https://media.istockphoto.com/id/1468883858/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=2048x2048&w=is&k=20&c=aEE2_dOWCK4F4F261ivqwcDC1m3lFXmwJtngl7RY2G4=",
            "https://media.istockphoto.com/id/1468888361/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=1024x1024&w=is&k=20&c=QH_6nug8e433mWH13Y5Bpyvxuk1CG7C5Ieo7GyneE7s=",
         "https://media.istockphoto.com/id/1468886519/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=2048x2048&w=is&k=20&c=YhL7QaXOB9o37sIlnhxix7-jWEKL0zbfjQsgJWX6378=",
    ],
    services: [
      
      {
        name: "Bday Shoot",
        duration: "4 hours",
        includes: ["1 photographer", "30 edited photos", "Print release"],
        price: "₹18,000",
      },
       {
        name: "Basic Wedding Package",
        duration: "10 hours",
        includes: ["1 photographer", "Digital album"],
        price: "₹35,000",
      },
      {
        name: "Basic Engagement Package",
        duration: "8 hours",
        includes: ["1 photographer", "Digital album"],
        price: "₹30,000",
      },
    ],
    about:
      "Specializing in portrait and event photography ,capturing life's most precious moments with an artistic eye and a passion for storytelling.",
    workingHours: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
  },
  {
    id: 4,
    name: "Aashutosh Photography",
    rating: 4.9,
    price: "₹40,000",
    eventTypes:["Wedding","Engagement","Bday","Corporate Event","Portrait"],
    //location: "Mumbai",
    images: ["https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=600", "images/p3.webp", "images/p4.jpg"],
    phone: "+91 87654 32109",
    description: "Expert all type of photography.",
    portfolio: [
//       "https://media.istockphoto.com/id/1454170096/photo/pink-decoration-with-balloons-and-swans-for-birthday-party.jpg?s=2048x2048&w=is&k=20&c=IdiOyGrGuYN8k_I4B6Ot8UiHH5OwxYX1PdNE5AQP3Ow=",
//  "https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=",
//  "https://media.istockphoto.com/id/2197936306/photo/birthday-party-decorations-three-tiered-cake-with-pink-roses-happy-birthday-text-topper-and.jpg?s=2048x2048&w=is&k=20&c=P-WMfPd38giHrhErH46ZYeldsDggOmHyDxxPwTh09O4=",
         "https://media.istockphoto.com/id/655007524/photo/friends-give-a-birthday-cake-to-their-friend.jpg?s=2048x2048&w=is&k=20&c=Pz-K99DTjjQwEvMnhXPqBIaB3eSlUUla-ca-ky0SyYI=",
         "https://media.istockphoto.com/id/907380874/photo/excited-young-woman-gets-birthday-cake.jpg?s=2048x2048&w=is&k=20&c=3vTwmedQ1W1r1GfO-hFClxBQ4HQp-BP5GyZAarEwKCQ=",
         "https://media.istockphoto.com/id/851103324/photo/closeup-groom-and-bride-are-holding-hands-at-wedding-day-ang-show-rings-concept-of-love-family.jpg?s=1024x1024&w=is&k=20&c=M79IQgooL3hnBw8zznW3mQhtCeI2V5x5FBj4gFPJt5A=",
         "https://media.istockphoto.com/id/1446478773/photo/business-people-are-talking-together-during-a-teambuilding-event-in-a-luxury-restaurant.jpg?s=1024x1024&w=is&k=20&c=wnxvvWERYGtVTfrydCfUblJjIZKUSRw-vkpOOsuWzXM=",
    "https://media.istockphoto.com/id/2195984093/photo/indian-couples-holding-hands-close-up.jpg?s=2048x2048&w=is&k=20&c=YRJR-wk4oRgwiEtMGGmsssE-8yDBdvgNlo7qJSJMSPw=",
  "https://media.istockphoto.com/id/1140927833/photo/bride-and-groom-hands-holding-bridal-showing-wedding-jewelry-ring-bangles.jpg?s=1024x1024&w=is&k=20&c=KkvcBfVjrueR4K1bRSJADZ9ahRd6zbA4zNp5uuexQlk=",
      "/images/port5.jpg", "https://media.istockphoto.com/id/893123282/photo/wedding-champagne-toast-stock-image.jpg?s=2048x2048&w=is&k=20&c=Mt9OAW6_IvMQKyuf9GtMzyjlHGt45nfIFhvdKpRnAMo=",
          //"https://media.istockphoto.com/id/1193554655/photo/bride-and-groom-holding-hands.jpg?s=1024x1024&w=is&k=20&c=XKDHER3z0YJDXKKrKGeuTkoQCR3KYd1Z5EYiZzPHlIE=",
           "https://media.istockphoto.com/id/668001632/photo/bride-hands-with-ring-and-wedding-bouquet-of-flowers.jpg?s=1024x1024&w=is&k=20&c=QE9SouNmnNrzv6sM_FENNQtl0DK0LE1sr_3XFS_-hvs=",
      "https://media.istockphoto.com/id/1191384303/photo/kids-birthday-party-outdoors-in-garden-in-summer-celebration-concept.jpg?s=1024x1024&w=is&k=20&c=XC9KYXoOakanikSIeZrKfvv6OPAhYC8U848pqoVT6wY=",//bday
        "https://media.istockphoto.com/id/1458481862/photo/asian-chinese-lesbian-couple-celebrating-birthday-outdoor-dining-with-friends.jpg?s=2048x2048&w=is&k=20&c=J99r0-JWty-ESlqyfGBh88G0BR6YoqdVeRO89jZms5k=",
     "https://media.istockphoto.com/id/1400225567/photo/floral-offerings-to-the-bride.jpg?s=2048x2048&w=is&k=20&c=Hoi-IJeYeDkTnGk3aPhRGbD834L4ShNb5EL1yfx2iXo=",
         "https://media.istockphoto.com/id/489247146/photo/happy-indian-couple-at-their-wedding.jpg?s=2048x2048&w=is&k=20&c=SR1jOlZnH7BTxtvXyLMGs22UmXQBdtauqu5xH9ph9dc=",
    ],
    services: [

      {
        name: "Portrait Session",
        duration: "2 hours",
        includes: ["1 photographer", "15 edited photos", "Online gallery"],
        price: "₹10,000",
      },
      {
        name: "Event Coverage",
        duration: "6 hours",
        includes: ["1 photographer", "50 edited photos", "Print release"],
        price: "₹20,000",
      },
            {
        name: "Basic Wedding Package",
        duration: "10 hours",
        includes: ["1 photographer", "Digital album"],
        price: "₹40,000",
      },
      {
        name: "Premium Corporate Shoot",
        duration: "6 hours",
        includes: ["1 photographer", "50 edited photos", "Print release"],
        price: "₹25,000",
      },
      {
        name: "Bday Shoot",
        duration: "4 hours",
        includes: ["1 photographer", "30 edited photos", "Print release"],
        price: "₹18,000",
      },
       {
        name: "Basic Engagement Package",
        duration: "8 hours",
        includes: ["1 photographer", "Digital album"],
        price: "₹30,000",
      },
    ],
    about:
      "Specializing in all type of photography, my goal is to provide a seamless and enjoyable photography experience,resulting in stunning visuals that you'll cherish for a lifetime.",
    workingHours: ["9:00 AM","10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM"],
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
            {/* <div
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
            </div> */}
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
  const bookingRef = useRef(null);
  const [eventType, setEventType] = useState(photographer ? photographer.eventTypes[0] : "");
  const [bookingStatus, setBookingStatus] = useState(null);
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

  // const handleBooking = () => {
  //   if (selectedDate && selectedTime) {
  //     alert(`Booking confirmed!\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}`);
  //   } else {
  //     alert("Please select both date and time");
  //   }
  // };

  const handleScrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const handleBooking = () => {
    // Clear any previous status
    setBookingStatus(null);

    if (selectedDate && selectedTime && eventType) {
      // Success
      setBookingStatus({ 
        message: `Booking Confirmed!`,
        date: selectedDate.toDateString(),
        time: selectedTime,
        type: eventType
      });
      
      // Form ko clear karein
      setSelectedDate(null);
      setSelectedTime("");
      setEventType(photographer.eventTypes[0]); // Dropdown ko default par reset karein
      
      // 5 second baad message ko gayab kar dein
      setTimeout(() => {
        setBookingStatus(null);
      }, 5000); 

    } else {
      // Error
      setBookingStatus({ 
        error: "Please select date, time, and event type." 
      });
       
      // 3 second baad error ko gayab kar dein
      setTimeout(() => {
        setBookingStatus(null);
      }, 3000);
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

    {/* Quick Action Buttons
    <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <button
      onClick={handleScrollToBooking}
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
      </button> */}
      {/* Quick Action Buttons */}
    <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <button
        onClick={handleScrollToBooking} // Yeh 'onClick' scroll ke liye hai jo humne pehle add kiya tha
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
      
      {/* 'View Portfolio' button yahaan se delete kar diya gaya hai */}
    
    </div> {/* Yeh "Buttons div" ko close kar raha hai */}
  </div> {/* Yeh "Info div" ko close kar raha hai */}
</div> {/* Yeh poore "Header Section" ko close kar raha hai */}


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
<section style={{ marginBottom: 40 }}ref={bookingRef}>
  <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>About {photographer.name.split(" ")[0]}</h2>
  <p style={{ backgroundColor: "#f8f9fa", padding: 24, borderRadius: 12 }}>{photographer.about}</p>
</section>
{/* Line 672 yahaan end hoti hai */}











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
                    
                    {/* YEH WALA DIV DYNAMIC HAI */}
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Event Type</label>
                      <select style={{ 
                        width: "100%", 
                        padding: "12px", 
                        border: "1px solid #d1d5db", 
                        borderRadius: 8,
                        fontSize: 16
                      }}>
                        value={eventType}
                       onChange={(e) => setEventType(e.target.value)}
                        {/* Yahaan purane hardcoded options nahi hain. Yeh dynamic hai. */}
                        {photographer.eventTypes.map((type, index) => (
                          <option key={index}>{type}</option>
                        ))}
                        
                      
                      </select>
                    </div>
                    {/* YAHAN TAK */}

                    
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
                      {bookingStatus && (
    <div style={{
      marginTop: 16,
      padding: 12,
      borderRadius: 8,
      border: bookingStatus.error ? "1px solid #ef4444" : "1px solid #22c55e",
      backgroundColor: bookingStatus.error ? "#fee2e2" : "#f0fdf4",
      color: bookingStatus.error ? "#b91c1c" : "#15803d",
      textAlign: 'left',
      transition: 'all 0.3s ease'
    }}>
      {bookingStatus.message && (
        <>
          <strong style={{ display: 'block', marginBottom: 8, fontSize: 15 }}>{bookingStatus.message}</strong>
          <div style={{ fontSize: 14 }}>Date: {bookingStatus.date}</div>
          <div style={{ fontSize: 14 }}>Time: {bookingStatus.time}</div>
          <div style={{ fontSize: 14 }}>Event: {bookingStatus.type}</div>
        </>
      )}
      {bookingStatus.error && (
        <strong style={{ fontSize: 14 }}>{bookingStatus.error}</strong>
      )}
    </div>
  )}

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