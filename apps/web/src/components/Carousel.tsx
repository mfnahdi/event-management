import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles

const PrettyCarousel = () => {
  return (
    <div>
      <Carousel
        showThumbs={false}
        showArrows={true}
        autoPlay={true}
        interval={5000}
      >
        <div>
          <img src="/ed.bmp" alt="ED Image" />
        </div>
        <div>
          <img src="/inc.bmp" alt="BMP Image" />
        </div>
      </Carousel>
    </div>
  );
};

export default PrettyCarousel;
