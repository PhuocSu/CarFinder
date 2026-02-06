"use client";

import { Flex, Image, Typography } from "antd";
import { formatNumber } from "@/utils/formatNumber";
import { calculateFinalPrice } from "@/utils/countPrice";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { VehicleBadge } from "@/enums/vehicle-badge.enum";
import FuelType from "@/enums/fuel.enum";
import { useRecoilValue } from "recoil";
import { favoriteCarState } from "@/store/favoriteCar.atom";
import { useToggleFavoriteMutation } from "@/app/api/favorite/useToggleFavoriteMutation";
import { useFavoriteQuery } from "@/app/api/favorite/useFavoriteQuery";
import { compareCarState } from "@/store/compareCar.atom";
import { useToggleCompareMutation } from "@/app/api/compare/useToggleCompareMutation";
import styles from "./css/CarCard.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { useTrackViewedMutation } from "@/app/api/recentlyViewed/useTrackViewedMutation";

const CarCard = ({
  vehicle,
  rankIndex = 0,
}: {
  vehicle: any;
  rankIndex?: number;
}) => {
  const finalPrice = calculateFinalPrice(
    vehicle.basePrice,
    vehicle.discountPercent,
  );
  const router = useRouter();
  const pathname = usePathname(); 
  const isHomepage = pathname === "/";

  const favoriteCars = useRecoilValue(favoriteCarState);
  const toggleFavorite = useToggleFavoriteMutation();
  const isFavorite = favoriteCars.includes(vehicle.id);

  const compareCars = useRecoilValue(compareCarState);
  const toggleCompare = useToggleCompareMutation();
  const isCompare = compareCars.includes(vehicle.id);

  const trackViewed = useTrackViewedMutation();

    const getTopBadge = (index: number) => {
    switch(index) {
      case 0: return "/images/homepage/Top1.svg";
      case 1: return "/images/homepage/Top2.svg";
      case 2: return "/images/homepage/Top3.svg";
      default: return null;
    }
  };

  const handleProductDetail = () => {
    router.push(`/productDetail?id=${vehicle.id}`);
    trackViewed.mutate(vehicle.id);
  };

  console.log(
    "Favorite Car: ",
    favoriteCars,
    "isFavorite:",
    isFavorite,
    "vehicleId:",
    vehicle.id,
  );
  return (
    <Flex
      className={styles["card--container"]}
      vertical
      style={{ width: "100%", borderRadius: "8px" }}
      onClick={handleProductDetail}
    >
      <Flex vertical style={{ position: "relative" }}>
        <div style={{ width: "100%", height: "220px", background: "#F5F5F5", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image
            style={{ height: "100%", width: "100%" }}
            src={
              vehicle.carImage?.length > 0
                ? vehicle.carImage[0]
                : "/images/default-car-image-detail.png"
            }
            alt="CarImage"
            preview={false}
          />
        </div>

        {isHomepage && rankIndex < 3 && (
          <Image
            style={{ 
              position: "absolute", 
              top: "-220px", 
              right: "10px", 
              width: "40px", 
              height: "40px",
              zIndex: 2
            }}
            src={getTopBadge(rankIndex)!}
            alt={`Top${rankIndex + 1}`}
            preview={false}
          />
        )}

        <Flex
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            zIndex: 1,
          }}
        >
          <Image
            style={{ padding: "6px", cursor: "pointer" }}
            src={
              isCompare
                ? "/images/CompareIconFilled.svg"
                : "/images/CompareIcon.svg"
            }
            alt="CompareIcon"
            preview={false}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn không bubble lên parent
              toggleCompare.mutate(vehicle.id);
            }}
          />

          <Image
            style={{ padding: "6px", cursor: "pointer" }}
            src={
              isFavorite
                ? "/images/FavoriteIconFilled.svg"
                : "/images/FavoriteIcon.svg"
            }
            alt="FavoriteIcon"
            preview={false}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn không bubble lên parent
              toggleFavorite.mutate(vehicle.id);
            }}
          />
        </Flex>

        <Flex
          gap={"8px"}
          style={{ position: "absolute", top: "8px", left: "8px" }}
        >
          {vehicle.vehicleBadge?.map((badge: string, index: number) => (
            <div
              key={index}
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 4,
                paddingBottom: 4,
                background:
                  "linear-gradient(163deg, #6427C2 0%, #2F2C4D 100%), linear-gradient(156deg, #44217A 0%, #2F2C4D 100%), var(--primary-bg-color-primary-bg-10, #EFE9FE)",
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                display: "flex",
              }}
            >
              <Typography.Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {VehicleBadge[badge as keyof typeof VehicleBadge]}
              </Typography.Text>
            </div>
          ))}
        </Flex>
      </Flex>

      <Flex style={{ marginTop: "12px", width: "100%" }}>
        <Flex vertical style={{ padding: "0 12px 12px" }}>
          {/* Car Name */}
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-60, #4A4A50)",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            {getVehicleFullName(vehicle)}
          </Typography.Text>

          {/* Price */}
          <Flex vertical gap={4} style={{ marginBottom: "12px" }}>
            {/* Discount Percent && basePrice */}
            {vehicle.discountPercent === 0 ? (
              <div style={{ height: "22px" }}></div>
            ) : (
              <Flex gap={4}>
                <Typography.Text
                  style={{
                    color:
                      "var(--status-error-color-status-error-fg-50, #EF4444)",
                    fontSize: 14,
                    fontFamily: "Noto Sans KR",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  {vehicle.discountPercent}%
                </Typography.Text>
                <Typography.Text
                  style={{
                    color: "var(--base-fg-color-base-fg-50, #666670)",
                    fontSize: 14,
                    fontFamily: "Noto Sans KR",
                    fontWeight: "400",
                    textDecoration: "line-through",
                    wordWrap: "break-word",
                  }}
                >
                  {formatNumber(vehicle.basePrice)}원
                </Typography.Text>
              </Flex>
            )}

            {/* basePrice */}
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-70, #37373E)",
                fontSize: 18,
                fontFamily: "Inter",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              {formatNumber(finalPrice)}원
            </Typography.Text>
          </Flex>

          {/* Car Badge */}
          <Flex gap={8}>
            {/* Year */}
            <div
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                overflow: "hidden",
                borderRadius: 2,
                outline:
                  "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <Typography.Text
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--base-fg-color-base-fg-50, #666670)",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {vehicle.manufacturerYear}년
              </Typography.Text>
            </div>

            {/* Mileage */}
            <div
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                overflow: "hidden",
                borderRadius: 2,
                outline:
                  "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <Typography.Text
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--base-fg-color-base-fg-50, #666670)",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {formatNumber(vehicle.mileage)}km
              </Typography.Text>
            </div>

            <div
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                overflow: "hidden",
                borderRadius: 2,
                outline:
                  "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <Typography.Text
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--base-fg-color-base-fg-50, #666670)",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {FuelType[vehicle.fuelType as keyof typeof FuelType]}
              </Typography.Text>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CarCard;
