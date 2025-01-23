import React, { useEffect, useState } from 'react';
import "../styles/createdEvents.css"

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("")

  // Fetch events from backend on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/getUsers", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
      },
      credentials: 'include',
    });
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        }

        
        setMessage('Failed To Fetch users');
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log("Events length....", users);

  const handleView = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleDelete = async (index) => {

    try {
      const response = await fetch(`http://localhost:3000/user/deleteUser/${index}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
        },
        credentials: 'include',
      });

      const data = await response.json()

      if (response.ok) {
        setUsers(users.filter((_, i) => i !== index));
        setMessage('Event deleted successfully');
        alert("User Deleted Successfully");
      } else {
        setMessage('Failed to delete the usert');
        alert(response.message);
      }
    } catch (error) {
      setMessage('Failed to delete the user');
      alert("Error Deleting User");
    }
  }

  const handleEdit = (index) => {
    // Implement edit logic
    console.log(`Edit event at index ${index}`);
  };

  return (
    <div className="event-list">
      <h2>Users</h2>

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
                  <button className="btn-primary" onClick={() => handleView(user)}>
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
      {modalVisible && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>First Name: {selectedUser.firstName}</h3>
            <p>Last Name: {selectedUser.lastName}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Gender: {selectedUser.gender}</p>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button className="btn-primary" onClick={() => handleDelete(selectedUser?.id)} >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
