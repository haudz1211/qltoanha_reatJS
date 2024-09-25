import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slideshow = () => {
  const images = [
    "../src/assets/img/building2.jpg",
    "../src/assets/img/building1.jpg",
    "../src/assets/img/building1.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`slide-${index}`} className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
