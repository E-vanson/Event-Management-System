import React from "react";
import Slider from "react-slick";
import "../styles/Carousel.css";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";

const Carousel = () => {
  const images = [
    { src: image1, text: "Create Memorable Events with Ease" },
    { src: image2, text: "Plan, Manage, and Enjoy Every Moment" },
    { src: image3, text: "Your Event, Your Vision, Our Platform" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600, // Smooth transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    customPaging: (i) => (
      <div className="custom-dot">
        <span>{i + 1}</span>
      </div>
    ),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="revamped-carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="revamped-carousel-slide">
            <img src={image.src} alt={`Slide ${index + 1}`} className="carousel-image" />
            <div className="carousel-overlay">
              <h2>{image.text}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next`}
      style={{ ...style }}
      onClick={onClick}
    >
      ❯
    </div>
  );
};

// Custom Prev Arrow
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev`}
      style={{ ...style }}
      onClick={onClick}
    >
      ❮
    </div>
  );
};

export default Carousel;
