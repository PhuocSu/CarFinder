"use client";

import VehicleBadgeFilter from "@/app/components/ui/vehicle/VehicleBadgeFilter";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import styles from "./SearchTab.module.scss";
import { useRecoilState } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";
import { useRouter } from "next/navigation";

const SearchTab = () => {
  const router = useRouter();
  const [searchState, setSearchState] = useRecoilState(vehicleFilterState);
  const search = searchState.search;

  const handleSearch = () => {
    if (search.trim()) {
      // search by keyword
      router.push(`/listPage?search=${encodeURIComponent(search.trim())}`);
    }

    if(searchState.badges && searchState.badges.length > 0) {
      router.push(`/listPage?badges=${searchState.badges.join(",")}`);
    }
  };

  return (
    <Flex vertical gap={"16px"} style={{ padding: "24px" }}>
      {/* Search Input + Button */}
      <Flex gap={"10px"} style={{ height: "52px" }}>
        <Input
          placeholder="차량을 검색해보세요"
          suffix={<SearchOutlined />}
          style={{ width: "568px", height: "100%" }}
          value={search}
          onChange={(e) => setSearchState({ ...searchState, search: e.target.value })}
        />
        <Button
          className={styles["button"]}
          data-icon="none"
          data-shownumber="true"
          data-size="X-large"
          data-state="enabled"
          data-style="primary"
          onClick={handleSearch}
        >
          <span className={styles["button__text"]}>검색</span>
        </Button>
      </Flex>

      {/* Car Badge */}
      <VehicleBadgeFilter
        onChange={(badges) => {
          console.log("Selected badges:", badges);
          // gọi API / set query / lưu state cha
        }}
      />
    </Flex>
  );
};

export default SearchTab;
