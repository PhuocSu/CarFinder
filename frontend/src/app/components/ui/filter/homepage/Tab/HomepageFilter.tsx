"use client";

import { Button, Flex, Input } from "antd";
import styles from "./HomepageFilter.module.scss";
import { useState } from "react";
import SearchTab from "./SearchTab/SearchTab";
import VehicleTypeTab from "./VehicleTypeTab/VehicleTypeTab";
import BudgetTab from "./BudgetType/BudgetTab";

const HomepageFilter = () => {
  const [activeTab, setActiveTab] = useState("검색으로 찾고싶어요");

  return (
    <Flex
      vertical
      className="homepage--filter"
      gap={"20px"}
      style={{ width: "753px" }}
    >
      {/*================= 3 Filter ================= */}
      <Flex className={"homepage--filter__filter"}>
        <div
          className={`${styles["homepage--filter__tab"]} ${
            activeTab === "검색으로 찾고싶어요"
              ? styles["homepage--filter__tab--active"]
              : ""
          }`}
          onClick={() => setActiveTab("검색으로 찾고싶어요")}
        >
          <span>검색으로 찾고싶어요</span>
        </div>

        <div
          className={`${styles["homepage--filter__tab"]} ${
            activeTab === "차종으로 보고싶어요"
              ? styles["homepage--filter__tab--active"]
              : ""
          }`}
          onClick={() => setActiveTab("차종으로 보고싶어요")}
        >
          <span>차종으로 보고싶어요</span>
        </div>

        <div
          className={`${styles["homepage--filter__tab"]} ${
            activeTab === "예산을 설정하고싶어요"
              ? styles["homepage--filter__tab--active"]
              : ""
          }`}
          onClick={() => setActiveTab("예산을 설정하고싶어요")}
        >
          <span>예산을 설정하고싶어요</span>
        </div>
      </Flex>

      {/* 검색으로 찾고싶어요 */}
      <SearchTab />

      {/* 차종으로 보고싶어요 */}
      <VehicleTypeTab />

      {/* 예산으로 찾고싶어요 */}
      <BudgetTab />

    </Flex>
  );
};

export default HomepageFilter;
