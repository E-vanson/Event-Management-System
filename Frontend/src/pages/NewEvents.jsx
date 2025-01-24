import React from "react";
import EventForm from "../components/EventForm";
import Carousel from "../components/carousel";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Carousel />
      <EventForm /> {/* Simply render the self-contained EventForm */}
    </div>
  );
};

export default Dashboard;
