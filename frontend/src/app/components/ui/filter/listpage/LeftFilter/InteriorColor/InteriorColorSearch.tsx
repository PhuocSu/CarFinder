"use client";

import { Badge, Button, Flex, Image, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { InteriorColor } from "@/enums/interior-color.enum";
import { INTERIOR_COLOR_OPTIONS } from "@/constants/listPage/interior-color/interior-color-options";

const YearSearch = () => {
  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)
  const [selectedButtons, setSelectedButtons] = useState<Set<InteriorColor>>(
    new Set()
  );
  const selectedCount = selectedButtons.size;

  const toggleButton = (color: InteriorColor) => {
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
          <Typography.Text>내장색상</Typography.Text>
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
              {INTERIOR_COLOR_OPTIONS.map((option) => {
                const isSelected = selectedButtons.has(option.key);

                return (
                  <Button
                    style={{
                      height: 40,
                      width: "100%",
                      boxSizing: "border-box", // tránh tràn do padding/border
                      overflow: "hidden", // ngăn tràn nội dung
                      fontWeight: isSelected ? 700 : 400,
                      border: `1px solid ${isSelected ? "#1B1B42" : "#E2E4E8"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",

                    }}
                    onClick={() => toggleButton(option.key)}
                  >
                    <Flex align="center" gap={8}>
                        <div style={{
                            width: 16,
                            height: 16,
                            borderRadius: "4px",
                            backgroundColor: option.swatchColor,
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
                        <Typography.Text style={{display: 'flex', 
                            flexWrap: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                            }}
                        >
                            {option.label}
                        </Typography.Text>
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
