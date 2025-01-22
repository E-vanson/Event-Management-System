import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import loginImage from "../assets/loginimage.jpg"; // Replace with the correct image path
import logo from "../assets/loginlogo.png"; // Replace with your logo image path

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
  
    try {
      // Normalize the email (trim spaces and convert to lowercase)
      const normalizedEmail = formData.email.trim().toLowerCase();
  
      // Prepare the form data with the normalized email
      const normalizedFormData = {
        ...formData,
        email: normalizedEmail, // Replace the original email with the normalized email
      };
  
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the backend interprets it as JSON
        },
        body: JSON.stringify(normalizedFormData), // Send normalized form data
      });
  
      // Parse the response data
      const data = await response.json();
  
      console.log("The response for login:", data);
  
      if (response.ok) {
        // If login is successful
        setMessage("Login successful! Redirecting to events...");
        localStorage.setItem("AuthToken", data.token); // Store token in localStorage
        setTimeout(() => navigate("/created-events"), 2000); // Redirect after 2 seconds
      } else {
        // If login fails, display the error message from the backend
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle any unexpected errors
      setMessage(error.message || "An error occurred during login.");
      console.error("Error during login:", error);
    }
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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>

        {message && <p className="feedback">{message}</p>}

        <button className="btn-secondary" onClick={handleSignUpClick}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
