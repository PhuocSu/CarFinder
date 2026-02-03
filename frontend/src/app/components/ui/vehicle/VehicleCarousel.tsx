"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Image } from "antd";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./css/VehicleCarousel.module.scss";
import { Vehicle, VEHICLES } from "@/constants/homepage/vehicleSlideOptions";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";

const LOOP_VEHICLES = [...VEHICLES, ...VEHICLES];

const VehicleCarousel = () => {
  const router = useRouter();
  const [, setFilter] = useRecoilState(vehicleFilterState);
  const handleVehicleClick = (vehicle: Vehicle) => {
    setFilter(prev => ({
      ...prev,
      modelIds: [vehicle.id],
      page: 1,
    }));
    
    router.push(`/listPage?modelIds=${vehicle.id}`);
  };

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
                key={index}
                onClick={() => handleVehicleClick(vehicle)}
                className={`${styles.item} ${
                  isActive ? styles.active : ""
                }`}
                style={{ cursor: "pointer" }}
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
