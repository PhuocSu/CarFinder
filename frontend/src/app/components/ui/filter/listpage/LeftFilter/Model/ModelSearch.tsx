"use client";

import { Badge, Button, Flex, Image, Typography } from "antd";
import styles from "./ModelSearch.module.scss";
import { VehicleBadge } from "@/enums/vehicle-badge.enum";
import { useState } from "react";

// ví dụ COUPE_OPTION = "쿠페특옵션"  => label: "쿠페특옵션", value: "COUPE_OPTION"
const badgeOptions = Object.entries(VehicleBadge).map(([key, value]) => ({
  label: value,
  value: key,
}));

const ModelSearch = () => {
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true); //đang hiển thị danh sách (nút mở/đóng)

  const toggleBadge = (value: string) => {
    setSelectedBadges((prev) => {
      if (prev.includes(value)) {
        // nếu đã chọn
        return prev.filter((badge) => badge !== value);
      } else {
        // nếu chưa chọn
        return [...prev, value];
      }
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
      <Flex
        gap={8}
        style={{
          width: "100%",
          padding: "0px 0px 13px",
          borderBottom:
            "1px solid var(--base-stroke-color-base-stroke-20, #E2E4E8)",
        }}
      >
        <Button
          style={{
            height: "40px",
            flex: 1,
            borderRadius: 2,
            border: "1px solid var(--button-tertiary-stroke-enabled, #CECED3)",
            background: "var(--button-tertiary-bg-enabled, #FFF)",
          }}
        >
          <Image
            src="/images/listPage/icon-list.svg"
            preview={false}
            width={24}
            height={24}
          />
          <Typography.Text className={styles.button__search__title}>
            최근 검색 조건
          </Typography.Text>
        </Button>
        <Button
          style={{
            height: "40px",
            flex: 1,
            borderRadius: 2,
            border: "1px solid var(--button-tertiary-stroke-enabled, #CECED3)",
            background: "var(--button-tertiary-bg-enabled, #FFF)",
          }}
        >
          <Image
            src="/images/listPage/icon-reload.svg"
            preview={false}
            width={24}
            height={24}
          />
          <Typography.Text className={styles.button__search__title}>
            초기화
          </Typography.Text>
        </Button>
      </Flex>

      {/* Search by model */}
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
            return selectedBadges.length > 0
              ? "6px solid var(--primary-stroke-color-primary-stroke-80, #4F4C6B)"
              : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)";
          })(),
          borderRadius: "4px",
        }}
      >
        <Flex justify="space-between">
          <Typography.Text>차량뱃지</Typography.Text>
          <Flex gap={8}>
            <Badge
              count={selectedBadges.length}
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
        {/* Enum bên trong */}
        {isOpen && (
          <Flex
            vertical
            gap={4}
            style={{
              height: "212px",
              padding: "12px",
              borderRadius: 4,
              border:
                "1px solid var(--base-stroke-color-base-stroke-30, #CBCFD6)",
              overflowY: "scroll",
            }}
          >
            <Flex vertical gap={4}>
              {badgeOptions.map((badge) => {
                const isActive = selectedBadges.includes(badge.value);
                return (
                  <Flex
                    key={badge.value}
                    onClick={() => toggleBadge(badge.value)}
                    style={{
                      width: "100%",
                      height: "32px",
                      padding: "0 12px",
                      background: isActive
                        ? "var(--primary-bg-color-primary-bg-10, #DCE4FE)"
                        : "var(--button-tertiary-bg-enabled, white)",
                      borderRadius: 2,
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography.Text
                      style={{
                        color: "var(--base-fg-color-base-fg-70, #313948)",
                        fontSize: 13,
                        fontFamily: "Noto Sans KR",
                        fontWeight: isActive ? "700" : "400",
                        wordWrap: "break-word",
                      }}
                    >
                      {badge.label}
                    </Typography.Text>

                    {/* Close khi ở trạng thái active */}
                    {isActive && (
                      <Image
                        src="/images/listPage/icon-close.svg"
                        preview={false}
                        width={16}
                        height={16}
                        onClick={(e) => {
                          e.stopPropagation(); // QUAN TRỌNG: ngăn sự kiện lan lên phần tử cha
                          toggleBadge(badge.value);
                        }}
                        style={{
                          cursor: "pointer",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ModelSearch;
