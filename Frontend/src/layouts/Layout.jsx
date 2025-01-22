import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`layout-container ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="layout-main">
      
        {children}
      </div>
    </div>
  );
};

export default Layout;
