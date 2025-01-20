import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/SignUp.css";
import signupImage from "../assets/signupimage.jpeg";
import logo from "../assets/loginlogo.png"; // Replace with the path to your logo

const SignUp = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="container">
      {/* Left: Form Section */}
      <div className="form-container">
        <div className="logo-section">
          <img src={logo} alt="EventHub Logo" className="logo" />
        </div>
        <h1>Join EventHub Today</h1>
        <p className="tagline">For exclusive event planning and management</p>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>

        {/* Login Button */}
        <button className="btn-secondary" onClick={handleLoginClick}>
          Already have an account? Login
        </button>
      </div>

      {/* Right: Image Section */}
      <div className="image-container">
        <img src={signupImage} alt="Event Management" />
      </div>
    </div>
  );
};

export default SignUp;
