import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import dailyStar from "../../assets/daily-star.svg";
import ittefak from "../../assets/ittefak.svg";
import dell from "../../assets/dell-2.svg";
import samakal from "../../assets/samakal.svg";
import samsung from "../../assets/samsung-7.svg";
import sony from "../../assets/sony-2.svg";
import ptt from "../../assets/ptt-public.svg";
import philips from "../../assets/philips.svg";
import camps from "../../assets/champs-24.svg";
import apple from "../../assets/apple-11.svg";

const logos = [
  dailyStar,
  ittefak,
  dell,
  samakal,
  samsung,
  sony,
  ptt,
  philips,
  camps,
  apple,
];

const FeaturedOn = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-4xl font-bold mb-10">
        We were <span className="text-cyan-500">Featured</span> on
      </h2>

      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {logos.map((logo, i) => (
            <SwiperSlide key={i}>
              <div className="flex justify-center items-center h-20">
                <img
                  src={logo}
                  alt="Featured logo"
                  className="h-10 grayscale hover:grayscale-0 transition"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedOn;
