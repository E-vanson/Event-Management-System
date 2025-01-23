import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="main-layout">
      {/* Pass the state and toggle function to the Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main content area */}
      <main className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

