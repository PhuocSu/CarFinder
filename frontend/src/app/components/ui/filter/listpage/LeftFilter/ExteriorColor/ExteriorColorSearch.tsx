"use client";

import { Badge, Button, Flex, Image, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import EXTERIOR_COLOR from "@/enums/exterior-color.enum";
import { EXTERIOR_COLOR_OPTIONS } from "@/constants/listPage/exterior-color/exterior-color-options";

const YearSearch = () => {
  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)
  const [selectedButtons, setSelectedButtons] = useState<Set<EXTERIOR_COLOR>>(
    new Set()
  );
  const selectedCount = selectedButtons.size;

  const toggleButton = (color: EXTERIOR_COLOR) => {
    setSelectedButtons((prev) => {
      const next = new Set(prev); //copy prev sang next
      next.has(color) ? next.delete(color) : next.add(color);
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
          <Typography.Text>외관색상</Typography.Text>
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
          <Flex gap={8}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 8,
                width: "100%",
              }}
            >
              {EXTERIOR_COLOR_OPTIONS.map((option) => {
                const isSelected = selectedButtons.has(option.key);

                return (
                  <Button
                    style={{
                      height: 40,
                      width: "100%",
                      fontWeight: isSelected ? 700 : 400,
                      border: `1px solid ${isSelected ? "#1B1B42" : "#E2E4E8"}`,
                    }}
                    onClick={() => toggleButton(option.key)}
                  >
                    <Flex align="center" gap={8} justify="flex-start">
                        <div style={{
                            width: 16,
                            height: 16,
                            borderRadius: "4px",
                            backgroundColor: option.swatchColor,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Image
                                src="/images/listPage/tick-icon.svg"
                                preview={false}
                                width="100%"
                                height="100%"
                                style={{
                                    opacity: isSelected ? 1 : 0,
                                }}
                            />
                        </div>
                        <Typography.Text>{option.label}</Typography.Text>
                    </Flex>
                  </Button>
                );
              })}
            </div>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default YearSearch;
