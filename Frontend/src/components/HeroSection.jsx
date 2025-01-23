import React from "react";
import "../styles/HeroSection.css";
import logo from "../assets/loginlogo.png"; 

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <img src={logo} alt="EventHub Logo" className="hero-logo" />
        <h1 className="hero-title">Welcome to EventHub</h1>
        <p className="hero-description">
          Your ultimate destination for planning, organizing, and managing
          unforgettable events. From corporate conferences to weddings, we help
          you make every moment count.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
