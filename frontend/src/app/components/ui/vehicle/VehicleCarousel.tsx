"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Image } from "antd";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./css/VehicleCarousel.module.scss";
import { VEHICLES } from "@/constants/homepage/vehicleSlideOptions";

const LOOP_VEHICLES = [...VEHICLES, ...VEHICLES];

const VehicleCarousel = () => {
  return (
    <div className={styles.wrapper}>
      {/* Custom arrows */}
      <div className={`${styles.arrow} ${styles.left}`}>
        <LeftOutlined />
      </div>
      <div className={`${styles.arrow} ${styles.right}`}>
        <RightOutlined />
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={5}
        centeredSlides
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: `.${styles.left}`,
          nextEl: `.${styles.right}`,
        }}
        className={styles.swiper}
      >
        {LOOP_VEHICLES.map((vehicle, index) => (
          <SwiperSlide key={`${vehicle.id}-${index}`}>
            {({ isActive }) => (
              <div
                className={`${styles.item} ${
                  isActive ? styles.active : ""
                }`}
              >
                <Image
                  src={vehicle.image}
                  preview={false}
                  className={styles.image}
                />
                <span>{vehicle.name}</span>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VehicleCarousel;
