"use client";

import { Empty, Flex, Image, Spin, Typography } from "antd";
import styles from "./css/InterestedVehicles.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useFavoriteQuery } from "@/app/api/favorite/useFavoriteQuery";
import { calculateFinalPrice } from "@/utils/countPrice";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { formatDate } from "@/utils/formatDate";
import { useToggleFavoriteMutation } from "@/app/api/favorite/useToggleFavoriteMutation";


const InterestedVehicles = () => {
  const { user } = useAuth();
  const { data: favoriteCars, isLoading, error } = useFavoriteQuery(user?.sub);
  const toggleFavorite = useToggleFavoriteMutation();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <img src="/images/loadcat.gif" alt="Loading..." style={{ width: '100px', height: '100px' }} />
      </div>
    );
  }

  const handleRemoveFavorite = (carId: number) => {
    toggleFavorite.mutate(carId);
  };

  if (error || !favoriteCars || favoriteCars.length === 0) {
    return (
      <Flex vertical gap={20} justify="center" align="center" style={{ padding: "50px" }}>
        <Empty
          image={<Image src="/empty/Empty.svg" />}
        />
        <Typography.Text style={{ color: "var(--base-fg-color-base-fg-60, #4A4A50)", fontSize: 16, fontFamily: "Noto Sans KR", fontWeight: "700", wordWrap: "break-word" }}>아직 관심 차량이 없습니다.</Typography.Text>
      </Flex>
    );
  }

  return (
    <Flex vertical style={{ padding: "24px 16px" }}>
      {
        favoriteCars.map((favorite: any) => {
          const car = favorite.car;
          const finalPrice = calculateFinalPrice(car.basePrice, car.discountPercent);

          return (
            <Flex gap={"24px"} style={{ padding: "24px 16px", borderBottom: "1px solid #E0E0E3"}}> 
              <Image
                src={car.carImage?.[0] || "/images/default-car-image-detail.png"}
                style={{ width: "196px", height: "100px", objectFit: "contain" }}
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
                    {formatDate(car.createdAt)}
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
                    {car.carRegNo}
                  </Typography.Text>
                </Flex>

                <Flex gap={10}>
                  <Flex vertical gap={8} style={{ width: "100%" }}>
                    <Typography.Text className={styles.interested__vehicles__name}>
                      {getVehicleFullName(car)}
                    </Typography.Text>
                    <Typography.Text className={styles.interested__vehicles__price}>
                      {finalPrice.toLocaleString()}원
                    </Typography.Text>
                  </Flex>

                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      height: "48px",
                      width: "48px",
                      border: "1px solid #CECED3",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveFavorite(car.id)}
                  >
                    <Image
                      src="/images/icon-heart.svg"
                      style={{ width: "24px", height: "24px" }}
                      preview={false}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )
        })
      }
    </Flex>
  );
};

export default InterestedVehicles;
