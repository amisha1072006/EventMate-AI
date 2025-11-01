


import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChurch, FaBriefcase, FaBirthdayCake, FaMusic } from "react-icons/fa";
import './Categories.css';

// Data mein koi badlav nahi
const allVenues = [
  // { id: 1, name: 'Elite Banquets', category:'Weddings',image:'https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg', location: 'Delhi', food: 'Veg', capacity: 150, eventType: 'Corporate Event' },
  // { id: 2, name: 'Sunset Hall', category:'Corporate', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', location: 'Mumbai', food: 'Non-Veg', capacity: 300, eventType: 'Wedding' },
  // { id: 3, name: 'Ocean View', category:'Weddings', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', location: 'Bangalore', food: 'Both', capacity: 800, eventType: 'Wedding' },
  // { id: 4, name: 'Royal Gardens', category:'Corporate', image: 'https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop', location: 'Lucknow', food: 'Veg', capacity: 450, eventType: 'Birthday Party' },
  // { id: 5, name: 'The Heritage Club', category:'Birthdays', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 600, eventType: 'Corporate Event' },
  // { id: 6, name: 'Golden Pavilion', category:'Concerts',image:'https://media.istockphoto.com/id/2153497521/photo/moroccan-cultural-wedding-organization.jpg?s=2048x2048&w=is&k=20&c=6-0YPLf-u_A8y4dEO9AuzKg1A82mdVFS6F-V-pQw2Cw=',  location: 'Mumbai', food: 'Veg', capacity: 200, eventType: 'Birthday Party' },
  // { id: 7, name: 'Starlight Lounge', category:'Birthdays',image:'https://media.istockphoto.com/id/450955083/photo/wedding.jpg?s=1024x1024&w=is&k=20&c=NrSTxwM01CQ6k5z_R_EJ0cEjHAZ4c8essmpIzRNwdnM=', location: 'Lucknow', food: 'Non-Veg', capacity: 100, eventType: 'Corporate Event' },
  // { id: 8, name: 'The Rosewood', category:'Concerts',image:'https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=', location: 'Bangalore', food: 'Veg', capacity: 350, eventType: 'Wedding' },
  // { id: 9, name: 'The Regency', category:'Concerts', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop', location: 'Delhi', food: 'Both', capacity: 700, eventType: 'Wedding' },
  // { id: 10, name: 'The Celestial', category:'Birthdays',image: 'https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=',  location: 'Lucknow', food: 'Veg', capacity: 250, eventType: 'Birthday Party' },
  // { id: 11, name: 'The Majestic', category:'Wedding',image:'https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=', location: 'Mumbai', food: 'Both', capacity: 900, eventType: 'Corporate Event' },
  // { id: 12, name: 'The Sovereign', category:'Corporate',image:'https://media.istockphoto.com/id/1446334741/photo/desserts-and-table-decorations-for-parties-and-celebrations-photography-of-snacks-and.jpg?s=2048x2048&w=is&k=20&c=W_T4nsYSZJU1YEw5x2JHzIrNPw_6Hxuegd4VTAzyBxY=',  location: 'Bangalore', food: 'Non-Veg', capacity: 80, eventType: 'Birthday Party' },
  // { id: 13, name: 'The Pinnacle', category:'Weddings',image:'https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=', location: 'Lucknow', food: 'Both', capacity: 550, eventType: 'Wedding' }

                      { id:1,name: "The Skyview Terrace", image:"https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg",  location:"Delhi",category:"Weddings", eventType:"Wedding", food:"Veg", capacity:1500,budget:150000},
                    {id:2,name: "Sunset vista",image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", location:"Bangalore",category:"Engagement", eventType:"Engagement",food:"Non-Veg", capacity:1000, budget:75000},
                    {id:3,name: "Azure Villa",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", location:"Bangalore",  category:"Corporate", eventType:"Corporate Event", food:"Both", capacity:800, budget:85000},
                    {id:4,name: "The Sovereign Hall",image:"https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop", location:"Lucknow",category:"Weddings", eventType:"Wedding", food:"Veg", capacity:2000, budget:100000},
                   {id:5,name: "The Legacy Hall",image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop", location:"Delhi", category:"Corporate",eventType:"Corporate Event", food:"Both", capacity:600, budget:110000},
                   
                    {id:6,name: "The Golden Atrium", image: "https://media.istockphoto.com/id/2153497521/photo/moroccan-cultural-wedding-organization.jpg?s=2048x2048&w=is&k=20&c=6-0YPLf-u_A8y4dEO9AuzKg1A82mdVFS6F-V-pQw2Cw= ",location:"Mumbai",            category:"Weddings", eventType:"Wedding", food:"Veg", capacity:2200, budget:160000},
                    {id:7,name: "The Empress Hall", image: "https://media.istockphoto.com/id/450955083/photo/wedding.jpg?s=1024x1024&w=is&k=20&c=NrSTxwM01CQ6k5z_R_EJ0cEjHAZ4c8essmpIzRNwdnM=", location:"Lucknow",                                            category:"Weddings", eventType:"Wedding", food:"Non-Veg", capacity:1500, budget:150000},
                    {id:8,name: "The Celebration Suite", image: "https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=", location:"Bangalore",category:"Birthdays", eventType:"Birthday Party", food:"Veg", capacity:550, budget:55000},
                    {id:9,name: "The Lagoon Deck", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop", location:"Delhi", category:"Engagement",eventType:"Engagement", food:"Both", capacity:700, budget:200000},
                    {id:10,name: "The Serene Garden", image: "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", location:"Pune",category:"Engagement", eventType:"Engagement", food:"Veg", capacity:950, budget:250000},
                   
                    {id:11,name: "The Grand Buffet", image: "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=", location:"Mumbai",category:"Corporate", eventType:"Corporate Event", food:"Both", capacity:900, budget:155000},
                    {id:12,name: "The Monarch Hall", image: "https://media.istockphoto.com/id/1446334741/photo/desserts-and-table-decorations-for-parties-and-celebrations-photography-of-snacks-and.jpg?s=2048x2048&w=is&k=20&c=W_T4nsYSZJU1YEw5x2JHzIrNPw_6Hxuegd4VTAzyBxY=", location:"Chennai",       category:"Birthdays", eventType:"Birthday Party", food:"Non-Veg", capacity:1100, budget:165000},
                    //13category:"",
                   // {id:13,name: "The Beachside Canopy",image: "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=", location:"Lucknow",category:"Weddings", eventType:"Wedding", food:"Both", capacity:2550, budget:199000},
//trending 
                      {id:14,name: "Amber Bloom Banquets",image:"/images/trending1.jpg",location: "Delhi",category:"Weddings", eventType:"Wedding",food: "Veg",capacity: 1150, budget:255000},
                    {id:15,name: "Sunset Terrace", image:"/images/trending2.jpeg",  location:"Mumbai",    category:"Weddings", eventType:"Wedding", food:"Non-Veg", capacity:900, budget:110000},
                    {id:16,name: "The White Palace",image:"/images/trending4.jpeg", location: "Bangalore",category:"Weddings", eventType:"Wedding", food:"Both",capacity: 1800,budget: 155000},
                   {id:17,name: "The Summit Hall", image: "/images/trending5.jpeg",  location:"Pune",     category:"Weddings", eventType:"Wedding", food:"Non-Veg",capacity: 1900,budget: 100000},
                    {id:18,name: "The  Vernda", image:"/images/trending3.jpeg",  location: "Bangalore",   category:"Weddings", eventType:"Wedding", food:"Both", capacity:8800, budget:165000},

                   
                    
                    {id:19,name: "The Regent's Club",image:"https://media.istockphoto.com/id/1455919586/photo/the-beautiful-decorations-cultural-program.jpg?s=1024x1024&w=is&k=20&c=J-63Pn0mhVhPT9yUBbogYGIRVGya6PTJngwpxsSgNHI=", location: "Delhi",                   category:"Weddings", eventType: "Wedding",food: "Veg",capacity: 1150,budget: 155000},
                   // {id:20,name:"The Onyx Suite", image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", location:"Pune",                                                                                                   category:"Weddings", eventType:"Wedding", food:"Non-Veg",capacity: 1900, budget:100000},
                    {id:21,name: "Ocean View", image: "https://media.istockphoto.com/id/2238876846/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=p7jD-TSxnGigDfhJvvdaatuwFKPQxuQnt8DLNOVqX7Y=", location: "Bangalore",category:"Weddings", eventType:"Wedding", food:"Both",capacity: 1800,budget: 175000},
                    {id:22,name: "Royal Gardens", image: "https://media.istockphoto.com/id/2195948319/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=yQ31b_IaY_NVQQMWALmqtfu9cr6siqsdEaXpXccRSsQ=",  location:"Chennai",                     category:"Weddings", eventType:"Wedding", food:"Veg", capacity:1450, budget:150000},
                    {id:23,name:"The Floral Canopy", image: "https://media.istockphoto.com/id/2196449572/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=5NclCrOw8x3wVX9o5Mwzr-aqP6P3QCW6tvPspqVtrCI=",location:"Chennai",                    category:"Weddings", eventType: "Wedding", food:"Both",capacity: 1600,budget: 110000},
                    
                    {id:24,name: "The Lotus Pavilion", image: "https://images.pexels.com/photos/33417234/pexels-photo-33417234.jpeg", location:"Mumbai", category:"Weddings",eventType:"Wedding", food:"Veg", capacity:2000, budget:160000},
                    {id:25,name: "The Royal Dias", image:"https://images.pexels.com/photos/32994470/pexels-photo-32994470.jpeg",  location:"Lucknow",    category:"Weddings",eventType:"Wedding", food:"Non-Veg",capacity: 1000,budget: 255000},
                    {id:26,name: "The Forum", image:"https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg", location: "Bangalore",category:"Corporate", eventType:"Corporate Event", food:"Veg", capacity:1350,budget: 300000},
                    {id:27,name: "The Convetion Plaza",image: "https://media.istockphoto.com/id/1133692578/photo/exhibition-event-hall-blur-background-of-trade-show-business-world-or-international-expo.jpg?s=2048x2048&w=is&k=20&c=YTnHhSaD9oWH-QWORQ1V8iPxsTwug3msm4VGGReVrlo=",  location:"Delhi",                    category:"Corporate", eventType:"Corporate Event",food: "Both", capacity:700, budget:200000},
                    {id:28,name: "The Grand Theatre", image:"https://media.istockphoto.com/id/1125802247/photo/abstract-blurred-image-of-conference-and-presentation-in-the-conference-hall.jpg?s=2048x2048&w=is&k=20&c=AvtzuNwftNaKMtDbB5aML2x441WxFvUn3r6jovt3Zeo=", location: "Pune",                                   category:"Corporate", eventType:"Corporate Event", food:"Veg", capacity:2250,budget: 150000},
                  // {id:29,name:, "The Majestic", "Corporate","https://media.istockphoto.com/id/1125802247/photo/abstract-blurred-image-of-conference-and-presentation-in-the-conference-hall.jpg?s=2048x2048&w=is&k=20&c=AvtzuNwftNaKMtDbB5aML2x441WxFvUn3r6jovt3Zeo=", "Mumbai", "Corporate Event", "Both", 900, 13000),category:"Corporate",
                    {id:29,name: "The Exhibition Hall", image: "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=", location: "Chennai",                category:"Corporate", eventType: "Corporate Event",food: "Non-Veg",capacity:1180,budget: 150000},
                    {id:30,name: "The Garden Arch", image:"https://media.istockphoto.com/id/530686143/photo/group-of-conference-participants-standing-in-lobby-of-conference-center-socializing-during.jpg?s=2048x2048&w=is&k=20&c=silyy0mNTULmxji7j5SkdsJfBVxhWBWMBcC27JJosOM=", location: "Lucknow",                     category:"Corporate", eventType: "Corporate Event",food: "Both",capacity:550,budget:180000},
                    {id:31,name: "The Midnight Blue Hall",image:"https://media.istockphoto.com/id/2183824556/photo/three-candles-on-a-candlestick-burning-at-a-party.jpg?s=1024x1024&w=is&k=20&c=VBBFeOf2AlQFYWiNnRhFC4zjppxfb_H4yNhf4yKTQuc=", location: "Bangalore",                                  category:"Birthdays",eventType: "Birthday Party", food:"Veg", capacity:950, budget:130000},
                   // {id:32,name: "The Regency", image:"https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=", location:    "Delhi", category:"Birthdays",eventType:"Birthday Party", food:"Both", capacity:700, budget:120000},
                    {id:33,name: "The Celebration Arch",image:"https://media.istockphoto.com/id/1163718652/photo/delicious-wedding-reception-birthday-cake-on-a-background-balloons-party-decor-copy-space.jpg?s=2048x2048&w=is&k=20&c=0CsKiE2O2oy8xAf8iAh8vffGuHFl2csA32Kq4c5NKFo=", location: "Pune", category:"Birthdays",eventType:"Birthday Party", food:"Veg",capacity: 550,budget: 950000},
                    {id:34,name: "The Majestic",image:"https://media.istockphoto.com/id/1454170096/photo/pink-decoration-with-balloons-and-swans-for-birthday-party.jpg?s=2048x2048&w=is&k=20&c=IdiOyGrGuYN8k_I4B6Ot8UiHH5OwxYX1PdNE5AQP3Ow=", location:"Mumbai",category:"Birthdays", eventType:"Birthday Party",food: "Both", capacity:900,budget: 130000},
                    {id:35,name: "The Golden Dias", image:"https://media.istockphoto.com/id/2197936306/photo/birthday-party-decorations-three-tiered-cake-with-pink-roses-happy-birthday-text-topper-and.jpg?s=2048x2048&w=is&k=20&c=P-WMfPd38giHrhErH46ZYeldsDggOmHyDxxPwTh09O4=", location: "Delhi", category:"Birthdays",eventType:"Birthday Party", food:"Non-Veg",capacity: 800,budget:150000},
                    {id:36,name: "The Pinnacle", image: "https://media.istockphoto.com/id/2172503802/photo/romantic-wedding-ceremony-on-the-sunny-beach.jpg?s=2048x2048&w=is&k=20&c=NzObe4VVkhbNU-I_AiEj4CsCIvx9JVMCzq2hxyLYblE=", location:"Mumbai",                                                  category:"Engagement",eventType: "Engagement",food: "Both",capacity:550,budget:180000},
                    {id:37,name: "The Celebration Wall", image: "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", location:"Mumbai",                         category:"Engagement",eventType:"Engagement",food: "Both", capacity:900,budget: 130000},
                    {id:38,name: "The Festive Entrance", image:"https://media.istockphoto.com/id/2172827163/photo/wedding-setty-back-with-floral-decorations.jpg?s=2048x2048&w=is&k=20&c=B90kHcL20hk_-VMNysUVCfyycsxS5Y1vT9022iMENPA=",  location: "Lucknow",                                          category:"Engagement",eventType:"Engagement", food:"Non-Veg",capacity: 980, budget:150000},
                    {id:39,name: "The Networking Hub", image: "https://media.istockphoto.com/id/996257874/photo/wedding-table-with-flower-compositions.jpg?s=1024x1024&w=is&k=20&c=Prx9f4FEJvBNgJR7F1VKgzmgc3fIMqWRCFoNLsvUbbM=",  location:"Chennayi",                                                category:"Engagement", eventType:"Engagement", food:"Both", capacity:550, budget:180000}
];

const Categories = () => {
  const navigate = useNavigate();
  // ✅ Step 1: Initial state ko 'null' rakhein
  const [category, setCategory] = useState(null);

  // ✅ Step 2: Button click ke liye ek function banayein
  const handleCategoryClick = (selectedCat) => {
    // Agar user usi button par dobara click kare, to selection hata dein
    if (category === selectedCat) {
      setCategory(null);
    } else {
      setCategory(selectedCat);
    }
  };

  // Filtering logic
  const filteredVenues = useMemo(() => {
    // Agar koi category select nahi hai, to khali array return karein
    if (!category) {
      return [];
    }
    // Nahi to, select ki hui category ke anusaar filter karein
    return allVenues.filter(venue => venue.category === category);
  }, [category]);

  const handleCheckAvailability = (venueId) => {
    navigate(`/Login`);
  };

  return (
    <>
      <div className="category-header">
        <aside className="catbar">
          <h3>Find By Category</h3>
          <div className="filter-group">
            <div className="category-icons">
              {/* ✅ Step 3: Naye function ko 'onClick' mein istemaal karein */}
              <button
                className={`category-btn ${category === "Weddings" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Weddings")}
              >
                <FaChurch /> <span>Weddings</span>
              </button>
              <button
                className={`category-btn ${category === "Engagement" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Engagement")}
              >
                <FaBriefcase /> <span>Engagement</span>
              </button>
              <button
                className={`category-btn ${category === "Birthdays" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Birthdays")}
              >
                <FaBirthdayCake /> <span>Birthdays</span>
              </button>
              <button
                className={`category-btn ${category === "Corporate" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Corporate")}
              >
                <FaMusic /> <span>Corporate </span>
              </button>
            </div>
          </div>
        </aside>

        {/* ✅ Step 4: POORE HALL SECTION PAR CONDITIONAL RENDERING LAGAYEIN */}
        {/* Yeh poora div sirf tabhi dikhega jab 'category' state null nahi hai */}
        {category && (
          <div className="find-hall-container">
            <main className="main-content">
              <div className="halls-grid">
                {filteredVenues.length > 0 ? (
                  filteredVenues.map(venue => (
                    <div className="hall-card" key={venue.id}>
                      <div className="hall-image-container">
                        <img src={venue.image} alt={venue.name} className="hall-image" />
                      </div>
                      <div className="hall-details">
                        <h4>{venue.name}</h4>
                        <button
                          className="availability-btn"
                          onClick={() => handleCheckAvailability(venue.id)}
                        >
                          Check Availability
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results">No halls found matching your criteria.</p>
                )}
              </div>
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
