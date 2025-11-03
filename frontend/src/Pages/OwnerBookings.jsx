import React, { useEffect, useState } from "react";
import "./OwnerBookings.css";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // If owner login exists → you can get their phone number from localStorage/session
  const ownerPhone = localStorage.getItem("ownerPhone"); // if you store it during login

  useEffect(() => {
    const fetchOwnerBookings = async () => {
      try {
        // ✅ If you want to fetch ALL bookings:
        const response = await fetch("http://localhost:8080/api/managehallbookings");

        // ✅ If you want only logged-in owner's bookings:
        // const response = await fetch(
        //   `http://localhost:8080/api/managehallbookings/byOwner?ownerPhone=${ownerPhone}`
        // );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerBookings();
  }, []);

  return (
    <div className="owner-bookings-wrapper">
      <h2>📅 Bookings made for halls </h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>Owner Name</th>
              <th>Owner Phone</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Booking Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.hallName}</td>
                <td>{booking.ownerName}</td>
                <td>{booking.ownerPhone}</td>
                <td>{booking.customerName}</td>
                <td>{booking.customerPhone}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerBookings;
