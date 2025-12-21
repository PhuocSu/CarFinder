"use client";

import HomepageFilter from "./components/ui/filter/homepage/Tab/HomepageFilter";
import RecentlyViewed from "./components/ui/sideBar/RecentlyViewed/RecentlyViewd";
import RightSidebar from "./components/ui/sideBar/RightSidebar";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export default function HomePage() {
  const {isOpen, open, close} = useRecentlyViewed();
  return (
    <div style={{ marginTop: "60px", height: "100%", width: "100%", position: "relative" }}>
      <HomepageFilter />
      <RightSidebar onOpen={open} />
      {isOpen && <RecentlyViewed onClose={close} />}
    </div>
  );
}