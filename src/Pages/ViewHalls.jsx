import React, { useEffect, useState } from "react";
import "./ViewHalls.css";

const ViewHalls = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/managehalls", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch halls");
        }

        const data = await response.json();
        setHalls(data);
      } catch (error) {
        console.error("Error fetching halls:", error);
      }
    };

    fetchHalls();
  }, []);

  return (
    <div className="view-halls-wrapper">
      <h2 className="view-halls-title">
        Halls added by owners. Contact them directly 📞
      </h2>

      {halls.length === 0 ? (
        <p className="no-halls-message">No halls available right now.</p>
      ) : (
        <div className="halls-container">
          {halls.map((hall) => (
            <div className="hall-item" key={hall.id}>
              <img
                src={hall.imageUrl1}
                alt={hall.hallName}
                className="hall-photo"
              />
              <h3>{hall.hallName}</h3>
              <p><strong>Owner:</strong> {hall.ownerName}</p>
              <p>
                <strong>Contact:</strong> {hall.phoneNumber}{" "}
                <a href={`tel:${hall.phoneNumber}`} className="contact-link">📞 Call</a>
              </p>
              <p><strong>Address:</strong> {hall.hallAddress}</p>
              <p><strong>Description:</strong> {hall.hallDescription}</p>
              <p><strong>Capacity:</strong> {hall.capacity} people</p>
              <p><strong>Budget:</strong> ₹{hall.budget}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewHalls;






















// import React, { useEffect, useState } from "react";
// import "./ViewHalls.css";

// const ViewHalls = () => {
//   const [halls, setHalls] = useState([]);
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [selectedHall, setSelectedHall] = useState(null);
//   const [userBooking, setUserBooking] = useState({
//     name: "",
//     phone: "",
//     date: ""
//   });
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);

//   useEffect(() => {
//     const savedHalls = JSON.parse(localStorage.getItem("halls")) || [];
//     setHalls(savedHalls);
//   }, []);

//   const openBookingModal = (hall) => {
//     setSelectedHall(hall);
//     setUserBooking({ name: "", phone: "", date: "" });
//     setBookingConfirmed(false);
//     setShowBookingModal(true);
//   };

//   const handleInputChange = (e) => {
//     setUserBooking({ ...userBooking, [e.target.name]: e.target.value });
//   };

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();

//     // Save booking info in localStorage
//     const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
//     existingBookings.push({
//       hallName: selectedHall.hallName,
//       ownerName: selectedHall.ownerName,
//       ownerPhone: selectedHall.phoneNumber,
//       userName: userBooking.name,
//       userPhone: userBooking.phone,
//       bookingDate: userBooking.date,
//       bookedAt: new Date().toLocaleString()
//     });
//     localStorage.setItem("bookings", JSON.stringify(existingBookings));

//     setBookingConfirmed(true);
//   };

//   const closeModal = () => {
//     setShowBookingModal(false);
//     setSelectedHall(null);
//     setBookingConfirmed(false);
//   };

//   return (
//     <div className="view-halls-wrapper">
//       <h2 className="view-halls-title">Halls added by owners,feel free to contact directly via provided 📞</h2>

//       {halls.length === 0 ? (
//         <p className="no-halls-message">No halls available right now.</p>
//       ) : (
//         <div className="halls-container">
//           {halls.map((hall, index) => (
//             <div className="hall-item" key={index}>
//               <img src={hall.imageUrl1} alt={hall.hallName} className="hall-photo" />
//               <h3>{hall.hallName}</h3>
//               <p><strong>Owner:</strong> {hall.ownerName}</p>
//               <p>
//                 <strong>Contact:</strong> {hall.phoneNumber}{" "}
//                 <a href={`tel:${hall.phoneNumber}`} className="contact-link">📞 Call</a>
//               </p>
//               <p><strong>Address:</strong> {hall.hallAddress}</p>
//               <p><strong>Description:</strong> {hall.hallDescription}</p>
//               <p><strong>Capacity:</strong> {hall.capacity} people</p>
//               <p><strong>Budget:</strong> ₹{hall.budget}</p>
//               <button className="book-hall-button" onClick={() => openBookingModal(hall)}>
//                 Book
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Booking Modal */}
//       {showBookingModal && selectedHall && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             {!bookingConfirmed ? (
//               <>
//                 <h3>Book {selectedHall.hallName}</h3>
//                 <form onSubmit={handleBookingSubmit}>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     value={userBooking.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Your Phone Number"
//                     value={userBooking.phone}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="date"
//                     name="date"
//                     value={userBooking.date}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <button type="submit" className="submit-booking-btn">Confirm Booking</button>
//                   <button type="button" className="cancel-booking-btn" onClick={closeModal}>Cancel</button>
//                 </form>
//               </>
//             ) : (
//               <>
//                 <h3>Booking Confirmed!</h3>
//                 <p>Your booking for <strong>{selectedHall.hallName}</strong> is successful.Owner will confirm it again.</p>
//                 <p>The owner will contact you shortly.</p>
//                 <button className="close-popup-btn" onClick={closeModal}>Close</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewHalls;














