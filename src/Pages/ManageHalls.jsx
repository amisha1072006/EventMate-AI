import React, { useEffect, useState } from "react";
//import "./ManageHalls.css"; // Optional CSS file

const dummyHalls = [
  {
    id: 1,
    name: "Grand Palace Banquet",
    location: "Downtown City Center",
    capacity: 300,
  },
  {
    id: 2,
    name: "Royal Heritage Hall",
    location: "Uptown District",
    capacity: 500,
  },
];

const ManageHalls = () => {
  const [halls, setHalls] = useState([]);

  // Simulate fetching halls from an API
  useEffect(() => {
    setTimeout(() => {
      setHalls(dummyHalls); // Replace this with your API call
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hall?")) {
      setHalls((prevHalls) => prevHalls.filter((hall) => hall.id !== id));
      // Here you’d also send a DELETE request to your backend
    }
  };

  const handleEdit = (id) => {
    // Navigate to edit form or show a modal
    alert(`Edit functionality for Hall ID ${id} coming soon.`);
  };

  return (
    <div className="manage-halls">
      <h2>Manage Halls</h2>
      <button className="add-hall-btn">+ Add New Hall</button>

      {halls.length === 0 ? (
        <p>Loading halls...</p>
      ) : (
        <table className="halls-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall.id}>
                <td>{hall.name}</td>
                <td>{hall.location}</td>
                <td>{hall.capacity}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(hall.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(hall.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageHalls;
