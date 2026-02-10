"use client";

import { Badge, Button, Flex, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import FuelType from "@/enums/fuel.enum";
import { useRecoilState, useRecoilValue } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";

// badges is, too!
export const FUEL_OPTIONS = [
  { key: "ALL", label: FuelType.ALL },
  { key: "GASOLINE", label: FuelType.GASOLINE },
  { key: "DIESEL", label: FuelType.DIESEL },
  { key: "LPG", label: FuelType.LPG },
  { key: "HYBRID", label: FuelType.HYBRID },
  { key: "ELECTRIC", label: FuelType.ELECTRIC },
] as const;

const FuelSearch = () => {
  const filter = useRecoilValue(vehicleFilterState);
  const [, setVehicleFilter] = useRecoilState(vehicleFilterState);

  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)
  type FuelKey = (typeof FUEL_OPTIONS)[number]["key"];
  const [selectedButtons, setSelectedButtons] = useState<Set<FuelKey>>(
    new Set(),
  );

  const selectedCount = selectedButtons.size;

  // Thêm sau dòng selectedCount
  useEffect(() => {
    setSelectedButtons(new Set((filter.fuelTypes || []) as FuelKey[]));
  }, [filter.fuelTypes]);

  useEffect(() => {
    const isFuelReset =
      (!filter.fuelTypes || filter.fuelTypes.length === 0) &&
      selectedButtons.size > 0;

    if (isFuelReset) {
      setSelectedButtons(new Set());
    }
  }, [filter.fuelTypes]);

  useEffect(() => {
    setVehicleFilter((prev) => ({
      ...prev,
      fuelTypes:
        selectedButtons.size > 0 ? Array.from(selectedButtons) : undefined,
      page: 1,
    }));
  }, [selectedButtons]);

  const toggleButton = (key: FuelKey) => {
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
          <Typography.Text>연료</Typography.Text>
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
                  style={{
                    flex: 1,
                    height: "100%",
                    fontWeight: selectedButtons.has(item.key) ? "700" : "400",
                    border: `1px solid ${selectedButtons.has(item.key) ? "var(--button-tertiary-stroke-selected, #1B1B42)" : "var(--base-stroke-color-base-stroke-20, #E2E4E8)"}`,
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
                  style={{
                    flex: 1,
                    height: "100%",
                    fontWeight: selectedButtons.has(item.key) ? "700" : "400",
                    border: `1px solid ${selectedButtons.has(item.key) ? "var(--button-tertiary-stroke-selected, #1B1B42)" : "var(--base-stroke-color-base-stroke-20, #E2E4E8)"}`,
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
                  style={{
                    flex: 1,
                    height: "100%",
                    fontWeight: selectedButtons.has(item.key) ? "700" : "400",
                    border: `1px solid ${selectedButtons.has(item.key) ? "var(--button-tertiary-stroke-selected, #1B1B42)" : "var(--base-stroke-color-base-stroke-20, #E2E4E8)"}`,
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

export default FuelSearch;
