import React, { useEffect, useState } from 'react';
import "../styles/createdEvents.css"

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch events from backend on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/getUsers");
        const data = await response.json();
        console.log("The Events Data....", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log("Events length....", users);

  const handleView = (user) => {
    setSelectedEvent(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    // Implement registration logic here
    alert(`Registered for the event: ${selectedUser.name}`);
    handleCloseModal(); // Close modal after registration
  };

  const handleDelete = (index) => {
    // Implement delete logic
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleEdit = (index) => {
    // Implement edit logic
    console.log(`Edit event at index ${index}`);
  };

  return (
    <div className="event-list">
      <h2>Created Events</h2>

      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <button className="btn-primary" onClick={() => handleView(event)}>
                    View
                  </button>
                  {/* <button className="btn-secondary" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(index)}>
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user created yet. Start by adding a new event!</p>
      )}

      {/* Modal to show event details */}
      {modalVisible && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedUser.firstName}</h3>
            <p>{selectedUser.lastName}</p>
            <p>{selectedUser.email}</p>
            <p>{selectedUser.gender}</p>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button className="btn-primary" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
