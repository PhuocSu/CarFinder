"use client";

import { Badge, Button, Flex, Image, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { YEARS } from "@/enums/year.enum";
import styles from "./YearSearch.module.scss";
import FuelType from "@/enums/fuel.enum";

export const FUEL_OPTIONS: { key: FuelType; label: string }[] = [
  { key: FuelType.ALL, label: "전체" },
  { key: FuelType.GASOLINE, label: "가솔린" },
  { key: FuelType.DIESEL, label: "디젤" },
  { key: FuelType.LPG, label: "LPG" },
  { key: FuelType.HYBRID, label: "하이브리드" },
  { key: FuelType.ELECTRIC, label: "전기" },
];

const YearSearch = () => {
  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)
  const [selectedButtons, setSelectedButtons] = useState<Set<FuelType>>(
    new Set()
  );
  const selectedCount = selectedButtons.size;

  const toggleButton = (key: FuelType) => {
    setSelectedButtons((prev) => {
      const next = new Set(prev); //copy prev sang next
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Search by models */}
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
            return selectedCount > 0
              ? "6px solid var(--primary-stroke-color-primary-stroke-80, #4F4C6B)"
              : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)";
          })(),
          borderRadius: "4px",
        }}
      >
        <Flex justify="space-between">
          <Typography.Text>차종</Typography.Text>
          <Flex gap={8}>
            <Badge
              count={selectedCount}
              style={{
                backgroundColor: "#3533CC",
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Noto Sans KR",
                width: 20,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            />
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
        </Flex>

        {/* Fuel */}
        {isOpen && (
          <Flex vertical gap={8}>
            <Flex gap={8} style={{ height: "40px" }}>
              {FUEL_OPTIONS.slice(0, 2).map((item) => (
                <Button
                  key={item.key}
                  style={{ flex: 1, height: "100%",
                    fontWeight: selectedButtons.has(item.key) ? "700" : "400",
                    border:  `1px solid ${selectedButtons.has(item.key) ? "var(--button-tertiary-stroke-selected, #1B1B42)" : "var(--base-stroke-color-base-stroke-20, #E2E4E8)"}`,
                   }}

                  onClick={() => toggleButton(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </Flex>
            <Flex gap={8} style={{ height: "40px" }}>
              {FUEL_OPTIONS.slice(2, 4).map((item) => (
                <Button
                  key={item.key}
                  style={{ flex: 1, height: "100%",
                    fontWeight: selectedButtons.has(item.key) ? "700" : "400",
                    border:  `1px solid ${selectedButtons.has(item.key) ? "var(--button-tertiary-stroke-selected, #1B1B42)" : "var(--base-stroke-color-base-stroke-20, #E2E4E8)"}`,
                   }}
                  onClick={() => toggleButton(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </Flex>
            <Flex gap={8} style={{ height: "40px" }}>
              {FUEL_OPTIONS.slice(4).map((item) => (
                <Button
                  key={item.key}
                  style={{ flex: 1, height: "100%",
                    fontWeight: selectedButtons.has(item.key) ? "700" : "400",
                    border:  `1px solid ${selectedButtons.has(item.key) ? "var(--button-tertiary-stroke-selected, #1B1B42)" : "var(--base-stroke-color-base-stroke-20, #E2E4E8)"}`,
                   }}
                  onClick={() => toggleButton(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default YearSearch;
