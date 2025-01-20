import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import loginImage from "../assets/loginimage.jpg"; // Replace with the correct image path
import logo from "../assets/loginlogo.png"; // Replace with your logo image path

const Login = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      {/* Left: Image Section */}
      <div className="image-container">
        <img src={loginImage} alt="Welcome to EventsHub" />
      </div>

      {/* Right: Login Section */}
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="EventsHub Logo" className="logo" />
        </div>
        <h2>Welcome Back to <span>EventsHub</span></h2>
        <p className="tagline">Your one-stop solution for event management.</p>

        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>

        <button className="btn-secondary" onClick={handleSignUpClick}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
