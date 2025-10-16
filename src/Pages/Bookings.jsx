import React from "react";
import "./Bookings.css";

const Bookings = ({ bookings }) => {
  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>

      {/* Summary Div */}
      <div className="bookings-summary">
        <h3>Total Bookings Made</h3>
        <p>{bookings ? bookings.length : 0}</p>
      </div>

      {bookings && bookings.length > 0 ? (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3 className="booking-event">{booking.eventName}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {booking.date ? new Date(booking.date).toLocaleDateString() : "-"}
              </p>
              <p>
                <strong>Time:</strong> {booking.time || "-"}
              </p>
              <p>
                <strong>Venue:</strong> {booking.hallName || "-"}
              </p>
              <p>
                <strong>Status:</strong> {booking.status || "-"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bookings">You have no bookings yet.</p>
      )}
    </div>
  );
};

export default Bookings;
