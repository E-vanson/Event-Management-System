import React from "react";
import { NavLink } from "react-router-dom";  // Use NavLink for active state management
import { FaBars, FaPlus, FaListAlt, FaHistory, FaFileAlt, FaSignInAlt, FaUserPlus, FaHome, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/sidebar.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <motion.div
      className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}
      initial={{ width: 0 }}
      animate={{ width: isSidebarOpen ? 250 : 80 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h2 className="sidebar-title">{isSidebarOpen ? "Event Manager" : ""}</h2>
      <nav className="sidebar-nav">
        <ul>
          <SidebarItem to="/" icon={<FaHome />} label="Home" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/new-event" icon={<FaPlus />} label="New Event" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/created-events" icon={<FaListAlt />} label="Created Events" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/upcoming-events" icon={<FaListAlt />} label="Upcoming Events" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/users" icon={<FaUser />} label="Users" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/past-events" icon={<FaHistory />} label="Past Events" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/templates" icon={<FaFileAlt />} label="Templates" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/login" icon={<FaSignInAlt />} label="Login" isSidebarOpen={isSidebarOpen} />
          <SidebarItem to="/signup" icon={<FaUserPlus />} label="Sign Up" isSidebarOpen={isSidebarOpen} />
        </ul>
      </nav>
    </motion.div>
  );
};

// SidebarItem component to handle hover and active state
const SidebarItem = ({ to, icon, label, isSidebarOpen }) => {
  return (
    <li className="sidebar-item" title={label}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="sidebar-icon"
      >
        {icon}
      </motion.div>
      {isSidebarOpen && (
        <NavLink 
          to={to} 
          className="sidebar-link" 
          activeClassName="active" 
        >
          {label}
        </NavLink>
      )}
    </li>
  );
};

export default Sidebar;
