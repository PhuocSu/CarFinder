"use client";

import { Flex, Typography } from "antd";
import styles from "./myPageDetail.module.scss";
import InterestedVehicles from "./InterestedVehicles/InterestedVehicles";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import VehiclesForPurchase from "./VehiclesForPurchase/VehiclesForPurchase";
import MemberInfoManagement from "./MemberInfoManagement/MemberInfoManagement";

const MyPageDetail = () => {
  const [activeTab, setActiveTab] = useState("VehiclesForPurchase");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  //khu url thay đổiđổi
  useEffect (() => {
    const tab = searchParams.get("tab") || "VehiclesForPurchase";
    setActiveTab(tab);
  }, [searchParams]);

  //Xử lý chuyển tabtab
  const handleTabChange = (tab : string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`);
  }

  const tabs = [
    {id: "VehiclesForPurchase", label: "판매차량"},
    // {id: "VehiclesForSale", label: "구매차량"},
    {id: "InterestedVehicles", label: "관심차량"},
    {id: "UserManagement", label: "회원정보 관리"},
  ]

  return (
    <Flex gap={"90px"} style={{width: "1200px", margin: "40px auto 0px"}}>
      <Flex vertical gap={"40px"} style={{ width: "110px" }}>
        <Typography.Text
          style={{
            width: "100%",
            color: "var(--base-fg-color-base-fg-60, #4A4A50)",
            fontSize: 24,
            fontFamily: "Noto Sans KR",
            fontWeight: "700",
            wordWrap: "break-word",
            whiteSpace: "nowrap",
          }}
        >
          마이페이지
        </Typography.Text>

        <Flex className={styles.div__tabs}>
        {tabs.map((tab) => (
            <span
              key={tab.id}
              className={`${styles.div__tabs__span} ${
                activeTab === tab.id ? styles.active : ""
              }`}
              onClick={() => handleTabChange(tab.id)}
              style={{
                cursor: "pointer",
              }}
            >
              {tab.label}
            </span>
          ))}
        </Flex>
      </Flex>

      <Flex style={{ width: "996px", height: "100%" }}>
        {/* InterestedVehicles */}
        <Flex style={{ width: "100%"}}>
          {/* Hiển thị tên người dùng */}
          <Flex vertical style={{ width: "100%" }}>
            <Typography.Text className={styles["display__name"]}>안녕하세요, 박웅님</Typography.Text>
            {/* Hiển thị component tương ứng */}
            {activeTab === "VehiclesForPurchase" && <VehiclesForPurchase />}
            {activeTab === "InterestedVehicles" && <InterestedVehicles />}
            {activeTab === "UserManagement" && <MemberInfoManagement />}
          </Flex>
          {/* Navigation */}
          <Flex>

          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyPageDetail;
