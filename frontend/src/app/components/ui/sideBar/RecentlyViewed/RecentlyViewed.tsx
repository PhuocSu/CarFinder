"use client";

import { CloseOutlined } from "@ant-design/icons";
import styles from "./RecentlyViewed.module.scss";
import { Flex, Image, Typography } from "antd";
import { useRecentlyViewedQuery } from "@/app/api/recentlyViewed/useRecentlyViewedQuery";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { calculateFinalPrice } from "@/utils/countPrice";
import { RecentlyViewedItem } from "@/types/recentlyViewed";
import { useAuth } from "@/hooks/useAuth";

interface RecentlyViewedProps {
  onClose: () => void;
}

const RecentlyViewed = ({ onClose }: RecentlyViewedProps) => {
  const {user} = useAuth();
  const { data: ViewedData, isLoading, isError } = useRecentlyViewedQuery(user?.sub);

  if (isLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src="/images/loadcat.gif" alt="Loading..." style={{ width: '100px', height: '100px' }} />
    </div>
  );
  if (isError) return <div>Error...</div>;

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
          <CloseOutlined style={{ cursor: "pointer" }} onClick={onClose} />
        </div>

        <div
          style={{
            paddingRight: "16px",
            maxHeight: "400px",
            overflowY: "scroll",
          }}
        >
          {ViewedData?.map((item: RecentlyViewedItem) => {
            return (
              <Flex vertical className={styles["car__container"]}>
                <Typography.Text className={styles["createdAt"]}>
                  {new Date(item.updatedAt).toLocaleDateString()}
                </Typography.Text>

                <Image
                  className={styles["image"]}
                  src={item.car.carImage?.[0] || "/images/default-car-image-detail.png"}
                  preview={false}
                />

                <Typography.Text className={styles["car__name"]}>
                  {item.car.subModel?.model?.modelName}
                  {item.car.subModel?.subModelName} {item.car.brandName}
                </Typography.Text>

                {item.car.discountPercent > 0 && (
                  <Flex gap={8}>
                    <Typography.Text className={styles["price__percent"]}>
                      {item.car.discountPercent}%
                    </Typography.Text>
                    <Typography.Text className={styles["base__price"]}>
                      {item.car.basePrice.toLocaleString()} 원
                    </Typography.Text>
                  </Flex>
                )}

                <Typography.Text className={styles["price__discount"]}>
                  {calculateFinalPrice(
                    item.car.basePrice,
                    item.car.discountPercent,
                  ).toLocaleString()}
                  원
                </Typography.Text>
              </Flex>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
