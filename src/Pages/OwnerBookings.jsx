import React, { useEffect, useState } from "react";
//import "./OwnerBookings.css"; // Optional CSS styling

const dummyBookings = [
  {
    id: 1,
    hallName: "Grand Palace Banquet",
    customerName: "John Doe",
    date: "2025-10-25",
    time: "6:00 PM - 11:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    hallName: "Royal Heritage Hall",
    customerName: "Jane Smith",
    date: "2025-11-03",
    time: "2:00 PM - 8:00 PM",
    status: "Pending",
  },
];

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(dummyBookings);
    }, 500);
  }, []);

  return (
    <div className="owner-bookings">
      <h2>Hall Bookings</h2>
      {bookings.length === 0 ? (
        <p>Loading bookings...</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.hallName}</td>
                <td>{booking.customerName}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
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
