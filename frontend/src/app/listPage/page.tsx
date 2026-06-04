"use client"

import { Suspense, useEffect } from "react";
import LeftFilter from "../components/ui/filter/listpage/LeftFilter/LeftFilter";
import RightContent from "../components/ui/filter/listpage/RightContent/RightContent";
import RightSidebar from "../components/ui/sideBar/RightSidebar";
import { useCompare } from "@/hooks/useCompare";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import RecentlyViewed from "../components/ui/sideBar/RecentlyViewed/RecentlyViewed";
import Compare from "../components/ui/sideBar/Compare/Compare";
import { useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";

const ListPageContent = () => {
    const { isOpen, open, close } = useRecentlyViewed();
    const searchParams = useSearchParams();
    const [filter, setFilter] = useRecoilState(vehicleFilterState);

    useEffect(() => {
        const search = searchParams.get('search');
        const badges = searchParams.get('badges'); //lấy giá trị từ query string
        const modelIds = searchParams.get('modelIds');
        const priceMin = searchParams.get('priceMin');
        const priceMax = searchParams.get('priceMax');

        setFilter(prev => ({
            ...prev,
            search: search || '',
            badges: badges ? badges.split(',') : [],
            modelIds: modelIds ? [parseInt(modelIds)] : [],
            priceMin: priceMin ? parseInt(priceMin) : undefined,
            priceMax: priceMax ? parseInt(priceMax) : undefined,
            page: 1, // Reset page khi mới filter
        }));
    }, [searchParams]);


    return (
        <div style={{ width: "1200px", height: "100%", margin: "40px auto", display: "flex", gap: "20px", position: "relative" }}>
            <RightSidebar onOpen={open} />
            <LeftFilter />
            <RightContent />

            <RightSidebar onOpen={open} />
            {isOpen && <RecentlyViewed onClose={close} />}
            <Compare />
        </div>
    );
};
const ListPage = () => (
  <Suspense fallback={null}>
    <ListPageContent />
  </Suspense>
);
export default ListPage
