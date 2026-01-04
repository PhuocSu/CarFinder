"use client";

import { useState } from "react";
import ImageSlide from "../imageSlide/ImageSlide";
import ImageModal from "../imageSlide/ImageModal";

const images = [
  "/images/car_sample_in_detail_page.webp",
  "/images/car/Actyon.svg",
  "/images/car/korando.svg",
  "/images/car/rexton.svg",
  "/images/car/Tivoli.svg",
  "/images/car/torres.svg",
  "/images/car/Actyon.svg",
  "/images/car/korando.svg",
  "/images/car/rexton.svg",
  "/images/car/Tivoli.svg",
  "/images/car/torres.svg",
  "/images/car/Actyon.svg",
  "/images/car/korando.svg",
  "/images/car/rexton.svg",
  "/images/car/Tivoli.svg",
  "/images/car/torres.svg",
];

const ProductDetail = () => {
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <ImageSlide images={images} onPreview={() => setOpenPreview(true)} />

      <ImageModal
        open={openPreview}
        images={images}
        onClose={() => setOpenPreview(false)}
      />
    </div>
  );
};

export default ProductDetail;
