"use client";

import { useState } from "react";
import ImageSlide from "../imageSlide/ImageSlide";
import ImageModal from "../imageSlide/ImageModal";
import ProductDetailComponent from "../forms/ProductDetail/ProductDetail";
import { useSearchParams } from "next/navigation";
import { useVehicleDetailQuery } from "@/app/api/productDetail/useProductDetailQuery";

// const images = [
//   "/images/car_sample_in_detail_page.webp",
//   "/images/car/Actyon.svg",
//   "/images/car/korando.svg",
//   "/images/car/rexton.svg",
//   "/images/car/Tivoli.svg",
//   "/images/car/torres.svg",
//   "/images/car/Actyon.svg",
//   "/images/car/korando.svg",
//   "/images/car/rexton.svg",
//   "/images/car/Tivoli.svg",
//   "/images/car/torres.svg",
//   "/images/car/Actyon.svg",
//   "/images/car/korando.svg",
//   "/images/car/rexton.svg",
//   "/images/car/Tivoli.svg",
//   "/images/car/torres.svg",
// ];

const ProductDetail = () => {
  const [openPreview, setOpenPreview] = useState(false);
    const params = useSearchParams();
    const { data: vehicleDetail, isFetching, isError } = useVehicleDetailQuery(params.get("id"));
  
    if (isFetching) return <div>Loading...</div>;
    if (isError) return <div>Error loading vehicle</div>;

     const vehicleImages = vehicleDetail?.carImage && vehicleDetail.carImage.length > 0 
    ? vehicleDetail?.carImage 
    : ["/images/default-car-image-detail.png"];
  return (
    <div style={{ width: "100%" }}>
      <ImageSlide images={vehicleImages} onPreview={() => setOpenPreview(true)} />

      <ImageModal
        open={openPreview}
        images={vehicleImages}
        onClose={() => setOpenPreview(false)}
      />

      <ProductDetailComponent vehicleDetail={vehicleDetail!} />

    </div>
  );
};
 
export default ProductDetail;

