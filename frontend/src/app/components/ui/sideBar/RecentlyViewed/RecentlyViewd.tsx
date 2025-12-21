"use client";

import { CloseOutlined } from "@ant-design/icons";
import styles from "./RecentlyViewed.module.scss";
import { Flex, Image, Typography } from "antd";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

interface RecentlyViewedProps {
  onClose: () => void;
}

const RecentlyViewed = ({onClose}: RecentlyViewedProps) => {

  return (
    <div className={styles["div__container"]}>
      <div
        style={{
          padding: "0px 0px 16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "14px",
          }}
        >
          <CloseOutlined
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div
          style={{
            paddingRight: "16px",
            maxHeight: "400px",
            overflowY: "scroll",
          }}
        >
          <Flex vertical className={styles["car__container"]}>
            <Typography.Text className={styles["createdAt"]}>
              2025-12-14
            </Typography.Text>

            <Image
              className={styles["image"]}
              src="/images/car_sample.webp"
              preview={false}
            />

            <Typography.Text className={styles["car__name"]}>
              티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
            </Typography.Text>

            <Flex gap={8}>
              <Typography.Text className={styles["price__percent"]}>
                6%
              </Typography.Text>
              <Typography.Text className={styles["base__price"]}>
                15,800,000 원
              </Typography.Text>
            </Flex>

            <Typography.Text className={styles["price__discount"]}>
              14,700,000원
            </Typography.Text>
          </Flex>

          <Flex vertical className={styles["car__container"]}>
            <Typography.Text className={styles["createdAt"]}>
              2025-12-14
            </Typography.Text>

            <Image
              className={styles["image"]}
              src="/images/car_sample.webp"
              preview={false}
            />

            <Typography.Text className={styles["car__name"]}>
              티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
            </Typography.Text>

            <Flex gap={8}>
              <Typography.Text className={styles["price__percent"]}>
                6%
              </Typography.Text>
              <Typography.Text className={styles["base__price"]}>
                15,800,000 원
              </Typography.Text>
            </Flex>

            <Typography.Text className={styles["price__discount"]}>
              14,700,000원
            </Typography.Text>
          </Flex>

          <Flex vertical className={styles["car__container"]}>
            <Typography.Text className={styles["createdAt"]}>
              2025-12-14
            </Typography.Text>

            <Image
              className={styles["image"]}
              src="/images/car_sample.webp"
              preview={false}
            />

            <Typography.Text className={styles["car__name"]}>
              티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
            </Typography.Text>

            <Flex gap={8}>
              <Typography.Text className={styles["price__percent"]}>
                6%
              </Typography.Text>
              <Typography.Text className={styles["base__price"]}>
                15,800,000 원
              </Typography.Text>
            </Flex>

            <Typography.Text className={styles["price__discount"]}>
              14,700,000원
            </Typography.Text>
          </Flex>

          <Flex vertical className={styles["car__container"]}>
            <Typography.Text className={styles["createdAt"]}>
              2025-12-14
            </Typography.Text>

            <Image
              className={styles["image"]}
              src="/images/car_sample.webp"
              preview={false}
            />

            <Typography.Text className={styles["car__name"]}>
              티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
            </Typography.Text>

            <Flex gap={8}>
              <Typography.Text className={styles["price__percent"]}>
                6%
              </Typography.Text>
              <Typography.Text className={styles["base__price"]}>
                15,800,000 원
              </Typography.Text>
            </Flex>

            <Typography.Text className={styles["price__discount"]}>
              14,700,000원
            </Typography.Text>
          </Flex>

          <Flex vertical className={styles["car__container"]}>
            <Typography.Text className={styles["createdAt"]}>
              2025-12-14
            </Typography.Text>

            <Image
              className={styles["image"]}
              src="/images/car_sample.webp"
              preview={false}
            />

            <Typography.Text className={styles["car__name"]}>
              티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
            </Typography.Text>

            <Flex gap={8}>
              <Typography.Text className={styles["price__percent"]}>
                6%
              </Typography.Text>
              <Typography.Text className={styles["base__price"]}>
                15,800,000 원
              </Typography.Text>
            </Flex>

            <Typography.Text className={styles["price__discount"]}>
              14,700,000원
            </Typography.Text>
          </Flex>

          <Flex vertical className={styles["car__container"]}>
            <Typography.Text className={styles["createdAt"]}>
              2025-12-14
            </Typography.Text>

            <Image
              className={styles["image"]}
              src="/images/car_sample.webp"
              preview={false}
            />

            <Typography.Text className={styles["car__name"]}>
              티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
            </Typography.Text>

            <Flex gap={8}>
              <Typography.Text className={styles["price__percent"]}>
                6%
              </Typography.Text>
              <Typography.Text className={styles["base__price"]}>
                15,800,000 원
              </Typography.Text>
            </Flex>

            <Typography.Text className={styles["price__discount"]}>
              14,700,000원
            </Typography.Text>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
