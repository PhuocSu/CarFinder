"use client";

import { Flex, Image, Typography } from "antd";
import styles from "./css/InterestedVehicles.module.scss";

const InterestedVehicles = () => {
  return (
    <Flex style={{ padding: "24px 16px" }}>
      <Flex gap={"24px"}>
        <Image
          src="/images/car_sample.webp"
          style={{ width: "196px", objectFit: "contain" }}
          preview={false}
        />
        <Flex vertical style={{ width: "742px" }}>
          <Flex justify="space-between">
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-50, #666670)",
                fontSize: 14,
                fontFamily: "Noto Sans KR",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              2025-04-08
            </Typography.Text>
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-60, #4A4A50)",
                fontSize: 16,
                fontFamily: "Noto Sans KR",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              149마9968
            </Typography.Text>
          </Flex>

          <Flex gap={10}>
            <Flex vertical gap={8} style={{ width: "100%" }}>
              <Typography.Text className={styles.interested__vehicles__name}>
                더 뉴렉스턴 스포츠 칸 쿨맨 2.2 4 WD 노블레스
              </Typography.Text>
              <Typography.Text className={styles.interested__vehicles__price}>
                45,000,000원
              </Typography.Text>
            </Flex>

            <Flex
              align="center"
              justify="center"
              style={{
                height: "48px",
                width: "48px",
                border: "1px solid #CECED3",
              }}
            >
              <Image
                src="/images/icon-heart.svg"
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
                preview={false}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InterestedVehicles;
