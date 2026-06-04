"use client";

import { Suspense } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import ProductDetail from "../components/ui/productDetail/ProductDetail";
import RecentlyViewed from "../components/ui/sideBar/RecentlyViewed/RecentlyViewed";
import RightSidebar from "../components/ui/sideBar/RightSidebar";
import Compare from "../components/ui/sideBar/Compare/Compare";

const ProductDetailPage = () => {
  const { isOpen, open, close } = useRecentlyViewed();

  return (
    <div
      style={{
        width: "1200px",
        height: "100%",
        margin: "40px auto",
        display: "flex",
        gap: "20px",
      }}
    >
      <Suspense fallback={null}>
        <ProductDetail />
      </Suspense>

      <RightSidebar onOpen={open} />
      {isOpen && <RecentlyViewed onClose={close} />}
      <Compare />

    </div>
  );
};

export default ProductDetailPage;
