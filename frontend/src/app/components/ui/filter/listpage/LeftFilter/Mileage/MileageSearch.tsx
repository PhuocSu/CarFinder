"use client";

import { Flex, Image, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { MILEAGE_STEPS } from "@/enums/mileage.enum";


const MileageSearch = () => {
  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)
  const [selectedStartMileage, setSelectedStartMileage] = useState<number | null>(null);
  const [selectedEndMileage, setSelectedEndMileage] = useState<number | null>(null);

  const hasMileageSelected =
    selectedStartMileage !== null || selectedEndMileage !== null;

  const endMileageOptions = selectedStartMileage
    ? MILEAGE_STEPS.filter((mileage) => mileage.value >= selectedStartMileage)
    : MILEAGE_STEPS;

  useEffect(() => {
    if (
      selectedStartMileage &&
      selectedEndMileage &&
      selectedStartMileage > selectedEndMileage
    ) {
      setSelectedEndMileage(null);
    }
  }, [selectedStartMileage]);

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Search by price */}
      <Flex
        vertical
        gap={20}
        style={{
          padding: "16px",
          borderTop: isOpen
            ? "none"
            : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
          borderBottom: isOpen
            ? "none"
            : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
          borderRight: isOpen
            ? "none"
            : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
          borderLeft: (() => {
            if (isOpen) return "none";
            return hasMileageSelected
              ? "6px solid var(--primary-stroke-color-primary-stroke-80, #4F4C6B)"
              : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)";
          })(),
          borderRadius: "4px",
        }}
      >
        <Flex justify="space-between">
          <Typography.Text>주행거리</Typography.Text>
          <Image
            src="/images/listPage/icon-chevron-down.svg"
            preview={false}
            width={20}
            height={20}
            onClick={() => setIsOpen((prev) => !prev)}
            style={{
              cursor: "pointer",
              color: "#3533CC",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </Flex>

        {/* Year */}
        {isOpen && (
          <Flex gap={8}>
            <Select
              style={{ width: 122, height: 40 }}
              value={selectedStartMileage ?? undefined}
              onChange={(value) => setSelectedStartMileage(value ?? null)}
              allowClear
              options={MILEAGE_STEPS}
              placeholder="최소"
            />

            <div style={{ display: "flex", alignItems: "center" }}>~</div>

            <Select
              style={{ width: 122, height: 40 }}
              value={selectedEndMileage ?? undefined}
              onChange={(value) => setSelectedEndMileage(value ?? null)}
              allowClear
              options={endMileageOptions}
              placeholder="최대"
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default MileageSearch;
