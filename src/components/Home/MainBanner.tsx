import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MainBanner() {
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <section className="flex flex-col mt-10 space-y-5 h-3/4">
      <p className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-primary">
        Welcome to <br />
        BunnyPresso
        <br />
      </p>
      <Slider
        {...bannerSettings}
        className="w-10/12 max-h-[500px] max-w-md mx-auto"
      >
        {new Array(3).fill(null).map((item, idx) => {
          return (
            <div className="w-full rounded-lg" key={`banner-${idx}`}>
              <img
                src={`/image/banner${idx + 1}.jpg`}
                alt="banner"
                className="w-full h-full rounded-lg shadow-md"
              />
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
