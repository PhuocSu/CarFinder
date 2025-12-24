"use client";

import { Flex, Image, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { YEARS } from "@/enums/year.enum";
import styles from "./YearSearch.module.scss";

const YearSearch = () => {
  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)
  const [selectedStartYear, setSelectedStartYear] = useState<number | null>(null);
  const [selectedEndYear, setSelectedEndYear] = useState<number | null>(null);
  const hasYearSelected =
    selectedStartYear !== null || selectedEndYear !== null;

  const endYearOptions = selectedStartYear
    ? YEARS.filter((year) => year >= selectedStartYear)
    : YEARS;

  useEffect(() => {
    if (
      selectedStartYear &&
      selectedEndYear &&
      selectedStartYear > selectedEndYear
    ) {
      setSelectedEndYear(null);
    }
  }, [selectedStartYear]);

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
            return hasYearSelected
              ? "6px solid var(--primary-stroke-color-primary-stroke-80, #4F4C6B)"
              : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)";
          })(),
          borderRadius: "4px",
        }}
      >
        <Flex justify="space-between">
          <Typography.Text>가격</Typography.Text>
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
              value={selectedStartYear ?? undefined}
              onChange={(value) => setSelectedStartYear(value ?? null)}
              allowClear
              options={YEARS.map((year) => ({ value: year, label: year }))}
              placeholder="최소 연식"
            />

            <div style={{ display: "flex", alignItems: "center" }}>~</div>

            <Select
              style={{ width: 122, height: 40 }}
              value={selectedEndYear ?? undefined}
              onChange={(value) => setSelectedEndYear(value ?? null)}
              allowClear
              options={endYearOptions.map((year) => ({
                value: year,
                label: year,
              }))}
              placeholder="최대 연식"
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default YearSearch;
