import React from "react";
import "./ManageHallsInfo.css";

const ManageHallsInfo = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1 className="info-title">Why Manage(Add) Halls?</h1>

        <p className="info-text">
          The <strong>Manage Halls</strong> feature is designed specifically for hall owners
          to showcase their properties on our platform. By adding and updating hall details, 
          owners can reach potential customers more effectively.
        </p>

        <h2 className="info-subtitle">Key Benefits:</h2>
        <ul className="info-list">
          <li><strong>Easy Hall Management:</strong> Add, hall listings effortlessly.</li>
          <li><strong>Customer Interaction:</strong> Receive booking requests and messages from customers directly.</li>
          <li><strong>Increased Visibility:</strong> Make your halls more discoverable by users searching on our website.</li>
          {/* <li><strong>Real-time Updates:</strong> Keep your hall availability accurate to avoid double bookings.</li> */}
        </ul>

        <h2 className="info-subtitle">How to Use:</h2>
        <ol className="info-steps">
          <li>Click on <strong>Manage Halls</strong> in the dashboard sidebar.</li>
          <li>Add your hall details: name, location, images, and pricing.</li>
          <li>Save your hall and wait for customer inquiries.</li>
          <li>Update or remove halls as needed to keep your listings current.</li>
        </ol>

        <p className="info-note">
          Keeping your hall information up-to-date increases your chances of bookings
          and ensures a smooth experience for both you and your customers.
        </p>
      </div>
    </div>
  );
};

export default ManageHallsInfo;
