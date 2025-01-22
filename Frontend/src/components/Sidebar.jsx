import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaListAlt, FaHistory, FaFileAlt, FaSignInAlt, FaUserPlus, FaHome, FaUser } from "react-icons/fa";
import "../styles/sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Event Manager</h2>
      <nav className="sidebar-nav">
        <ul>
        <li>
            <FaHome className="sidebar-icon" />
            <Link to="/">Home</Link>
          </li>
          <li>
            <FaPlus className="sidebar-icon" />
            <Link to="/new-event">New Event</Link>
          </li>
          <li>
            <FaListAlt className="sidebar-icon" />
            <Link to="/created-events">Created Events</Link>
          </li>
          <li>
            <FaUser className="sidebar-icon" />
            <Link to="/users">Users</Link>
          </li>
          {/* <li>
            <FaHistory className="sidebar-icon" />
            <Link to="/past-events">Past Events</Link>
          </li> */}
          {/* <li>
            <FaFileAlt className="sidebar-icon" />
            <Link to="/templates">Templates</Link>
          </li> */}
          <li>
            <FaSignInAlt className="sidebar-icon" />
            <Link to="/login">Login</Link>
          </li>
          <li>
            <FaUserPlus className="sidebar-icon" />
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
