"use client";

import VehicleBadgeFilter from "@/app/components/ui/vehicle/VehicleBadgeFilter";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import styles from "./SearchTab.module.scss";

const SearchTab = () => {
  return (
    <Flex vertical gap={"16px"} style={{ padding: "24px" }}>
      {/* Search Input + Button */}
      <Flex gap={"10px"} style={{ height: "52px" }}>
        <Input
          placeholder="차량을 검색해보세요"
          suffix={<SearchOutlined />}
          style={{ width: "568px", height: "100%" }}
        />
        <Button
          className={styles["button"]}
          data-icon="none"
          data-shownumber="true"
          data-size="X-large"
          data-state="enabled"
          data-style="primary"
          // style={{
          //   width: "181px",
          //   height: "100%",
          //   paddingLeft: 20,
          //   paddingRight: 20,
          //   background: "var(--button-primary-bg-enabled, #2F2C4D)",
          //   borderBottomRightRadius: 2,
          //   justifyContent: "center",
          //   alignItems: "center",
          //   gap: 4,
          //   display: "inline-flex",
          // }}
        >
          <span
            className={styles["button__text"]}
            // style={{
            //   color: "var(--button-primary-fg, white)",
            //   fontSize: 16,
            //   fontFamily: "Inter",
            //   fontWeight: "700",
            //   lineHeight: 24,
            //   wordWrap: "break-word",
            // }}
          >
            검색
          </span>
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
