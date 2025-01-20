import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main">{children}</div>
    </div>
  );
};

export default Layout;
