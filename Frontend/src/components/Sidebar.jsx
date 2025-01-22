import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaPlus,
  FaListAlt,
  FaHistory,
  FaFileAlt,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/sidebar.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className={`main-sidebar ${isSidebarOpen && !isSmallScreen ? "open" : "collapsed"}`}
      initial={{ width: 0 }}
      animate={{ width: isSidebarOpen && !isSmallScreen ? 250 : 80 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {!isSmallScreen && (
        <button
          className="main-sidebar__toggle"
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        >
          <FaBars />
        </button>
      )}
      <h2 className="main-sidebar__title">
        {isSidebarOpen && !isSmallScreen ? "Event Manager" : ""}
      </h2>
      <nav className="main-sidebar__nav">
        <ul className="main-sidebar__list">
          <SidebarItem
            to="/"
            icon={<FaHome />}
            label="Home"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/new-event"
            icon={<FaPlus />}
            label="New Event"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/created-events"
            icon={<FaListAlt />}
            label="Created Events"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/upcoming-events"
            icon={<FaListAlt />}
            label="Upcoming Events"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/users"
            icon={<FaUser />}
            label="Users"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/past-events"
            icon={<FaHistory />}
            label="Past Events"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/templates"
            icon={<FaFileAlt />}
            label="Templates"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/login"
            icon={<FaSignInAlt />}
            label="Login"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
          <SidebarItem
            to="/signup"
            icon={<FaUserPlus />}
            label="Sign Up"
            isSidebarOpen={isSidebarOpen && !isSmallScreen}
          />
        </ul>
      </nav>
    </motion.div>
  );
};

const SidebarItem = ({ to, icon, label, isSidebarOpen }) => {
  return (
    <li className="main-sidebar__item" title={label}>
      <NavLink to={to} className="main-sidebar__icon-link">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="main-sidebar__icon"
        >
          {icon}
        </motion.div>
      </NavLink>
      {isSidebarOpen && (
        <NavLink
          to={to}
          className="main-sidebar__link"
          activeClassName="main-sidebar__link--active"
        >
          {label}
        </NavLink>
      )}
    </li>
  );
};

export default Sidebar;
