import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import UpcomingEvents from "./pages/UpcomingEvents";
import NewEvent from "./pages/NewEvents";
import PastEvents from "./pages/PastEvents";
import Templates from "./pages/Templates";
import Users from "./pages/Users";
import CreatedEvents from "./pages/CreatedEvents";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 


const ProtectedRoutes = ({ children }) => {
  return <Layout>{children}</Layout>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes without Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoutes>
              <Users/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/created-events"
          element={
            <ProtectedRoutes>
              <CreatedEvents />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/upcoming-events"
          element={
            <ProtectedRoutes>
              <UpcomingEvents />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/new-event"
          element={
            <ProtectedRoutes>
              <NewEvent />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/past-events"
          element={
            <ProtectedRoutes>
              <PastEvents />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoutes>
              <Templates />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
