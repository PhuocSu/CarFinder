"use client";

import Image from "next/image";
import styles from "./css/ImageSlide.module.scss";
import { useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ImagePreview from "./ImagePreview";

type ImageSlideProps = {
  images: string[];
  onPreview: () => void; // Open Preview
};

const ImageSlide = ({ images, onPreview }: ImageSlideProps) => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.imageSlide}>
      {/* Main Image */}
      <div className={styles.mainImage}>
        <Button className={styles.navLeft} onClick={prev}>
          <LeftOutlined />
        </Button>

        <Image
          src={images[current]}
          alt="car-image"
          fill
          priority
          className={styles.image}
        />

        <ImagePreview onClick={onPreview} />

        <Button className={styles.navRight} onClick={next}>
          <RightOutlined />
        </Button>
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbnails}>
        {images.map((img, index) => {
          return (
            <div
              key={index}
              className={`${styles.thumb} ${
                index === current ? styles.active : ""
              }`}
              onClick={() => setCurrent(index)}
            >
              <Image src={img} alt="thumb" fill />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlide;
