"use client";

import { Image } from "antd";
import HomepageFilter from "./components/ui/filter/homepage/Tab/HomepageFilter";
import Compare from "./components/ui/sideBar/Compare/Compare";
import RecentlyViewed from "./components/ui/sideBar/RecentlyViewed/RecentlyViewed";
import RightSidebar from "./components/ui/sideBar/RightSidebar";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import BannerHomepage from "./components/ui/banner/homepage/BannerHomepage";
import TopChoice from "./components/ui/homepage/TopChoice";

export default function HomePage() {
  const { isOpen, open, close } = useRecentlyViewed();
  return (
    <div>
      <BannerHomepage />

      <div
        style={{
          marginTop: "60px",
          height: "100%",
          width: "100%",
          position: "relative",
          gap: "60px"
        }}
      >
        <HomepageFilter />
        <RightSidebar onOpen={open} />
        {isOpen && <RecentlyViewed onClose={close} />}
        <Compare />
        
        <TopChoice />
      </div>
    </div>
  );
}
