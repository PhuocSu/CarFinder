"use client";

import { useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { VEHICLE_BADGE_OPTIONS } from "@/constants/homepage/vehicleBadgeOptions";
import styles from "./css/VehicleBadgeFilter.module.scss";

type Props = {
  onChange?: (selected: string[]) => void;
};

const VehicleBadgeFilter = ({ onChange }: Props) => {
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null); //Tham chiếu đến phần tử container chứa các badge để điều khiển cuộn

  const toggleBadge = (key: string) => {
    setSelectedBadges((prev) => {
      const next = prev.includes(key)
        ? prev.filter((k) => k !== key) //bỏ chọn nếu đã chọn
        : [...prev, key]; //thêm vào nếu chưa chọn

      onChange?.(next); //gọi callback với danh sách mới
      return next;
    });
  };

  //cuộn ngang
  const scroll = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <Flex align="center" gap={8}>
      <LeftOutlined className={styles.arrow} onClick={() => scroll(-200)} />

      <div ref={scrollRef} className={styles.container}>
        {VEHICLE_BADGE_OPTIONS.map(({ key, label }) => {
          const active = selectedBadges.includes(key);

          return (
            <div
              key={key}
              className={`${styles.badge} ${
                active ? styles.active : ""
              }`}
              onClick={() => toggleBadge(key)}
            >
              {label}
            </div>
          );
        })}
      </div>
      <RightOutlined className={styles.arrow} onClick={() => scroll(200)} />
    </Flex>
  );
};

export default VehicleBadgeFilter;
