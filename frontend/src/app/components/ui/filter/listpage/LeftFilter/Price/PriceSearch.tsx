"use client";

import { Flex, Image, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { PRICE_STEPS } from "@/enums/price.enum";
import styles from "./PriceSearch.module.scss";

const PriceSearch = () => {
  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)
  const [selectedStartPrice, setSelectedStartPrice] = useState<number | null>(null);
  const [selectedEndPrice, setSelectedEndPrice] = useState<number | null>(null);

  const hasPriceSelected =
    selectedStartPrice !== null || selectedEndPrice !== null;

  const endPriceOptions = selectedStartPrice
    ? PRICE_STEPS.filter((price) => price.value >= selectedStartPrice)
    : PRICE_STEPS;

  useEffect(() => {
    if (
      selectedStartPrice &&
      selectedEndPrice &&
      selectedStartPrice > selectedEndPrice
    ) {
      setSelectedEndPrice(null);
    }
  }, [selectedStartPrice]);

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
            return hasPriceSelected
              ? "6px solid var(--primary-stroke-color-primary-stroke-80, #4F4C6B)"
              : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)";
          })(),
          borderRadius: "4px",
        }}
      >
        <Flex justify="space-between">
          <Typography.Text>연식</Typography.Text>
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
              value={selectedStartPrice ?? undefined}
              onChange={(value) => setSelectedStartPrice(value ?? null)}
              allowClear
              options={PRICE_STEPS}
              placeholder="최소"
            />

            <div style={{ display: "flex", alignItems: "center" }}>~</div>

            <Select
              style={{ width: 122, height: 40 }}
              value={selectedEndPrice ?? undefined}
              onChange={(value) => setSelectedEndPrice(value ?? null)}
              allowClear
              options={endPriceOptions}
              placeholder="최대"
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default PriceSearch;
