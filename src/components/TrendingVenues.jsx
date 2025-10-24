// import React from 'react';

// const venues = [
//   { id: 1, name: 'Palace Mayfair', rating: 4.8, img: '/images/trending1.jpg' },
//   { id: 2, name: 'Festsaal Königspalast', rating: 4.9, img: '/images/trending2.jpeg' },
//   { id: 3, name: 'Asse Tap Room', rating: 4.7, img: '/images/trending4.jpeg' },
//   { id: 4, name: 'Penton Park', rating: 4.8, img: '/images/trending5.jpeg' },
//   { id: 5, name: 'Titanic Town Hall', rating: 4.9, img: '/images/trending3.jpeg' },
// ];

// const VenueCard = ({ venue }) => (
//   <div className="venue-card">
//     <img src={venue.img} alt={venue.name} />
//     <div className="venue-card-info">
//       <h3>{venue.name}</h3>
//       <p>⭐ {venue.rating}</p>
//     </div>
//   </div>
// );

// const TrendingVenues = () => {
//   return (
//     <section className="trending-section">
//       <div className="container">
//         <h2 className="section-title">Trending Venues</h2>
//         <div className="venues-slider">
//           {venues.map(venue => (
//             <VenueCard key={venue.id} venue={venue} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingVenues;






























import React, { useEffect, useRef } from "react";

const venues = [
  { id: 1, name: "Palace Mayfair", rating: 4.8, img: "/images/trending1.jpg" },
  { id: 2, name: "Festsaal Königspalast", rating: 4.9, img: "/images/trending2.jpeg" },
  { id: 3, name: "Asse Tap Room", rating: 4.7, img: "/images/trending4.jpeg" },
  { id: 4, name: "Penton Park", rating: 4.8, img: "/images/trending5.jpeg" },
  { id: 5, name: "Titanic Town Hall", rating: 4.9, img: "/images/trending3.jpeg" },
   { id: 1, name: "Palace Mayfair", rating: 4.8, img: 'https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg'},
  { id: 2, name: "Festsaal Königspalast", rating: 4.9, img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop'},
  { id: 3, name: "Asse Tap Room", rating: 4.7, img:'https://media.istockphoto.com/id/450955083/photo/wedding.jpg?s=1024x1024&w=is&k=20&c=NrSTxwM01CQ6k5z_R_EJ0cEjHAZ4c8essmpIzRNwdnM=' },
  { id: 4, name: "Penton Park", rating: 4.8, img:'https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=' },
  { id: 5, name: "Titanic Town Hall", rating: 4.9, img:'https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs='},
];

const VenueCard = ({ venue }) => (
  <div className="venue-card min-w-[250px] mx-3 rounded-lg overflow-hidden shadow bg-white">
    <img src={venue.img} alt={venue.name} className="w-full h-40 object-cover" />
    <div className="p-3">
      <h3 className="font-semibold text-lg">{venue.name}</h3>
      <p className="text-gray-600">⭐ {venue.rating}</p>
    </div>
  </div>
);

const TrendingVenues = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;
    let speed = 1; // adjust speed (px/frame)

    const scrollStep = () => {
      if (container) {
        scrollAmount += speed;
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0; // reset for infinite effect
        }
        container.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(scrollStep);
    };

    requestAnimationFrame(scrollStep);
  }, []);

  return (
    <section className="trending-section py-10">
      <div className="container mx-auto">
        <h2 className="section-title text-2xl font-bold mb-6">Trending Venues</h2>

        {/* Scrollable slider */}
        <div
          ref={scrollRef}
          className="venues-slider flex overflow-hidden whitespace-nowrap"
        >
          {/* Duplicate venues for seamless infinite scroll */}
          {[...venues, ...venues].map((venue, index) => (
            <VenueCard key={index} venue={venue} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingVenues;
