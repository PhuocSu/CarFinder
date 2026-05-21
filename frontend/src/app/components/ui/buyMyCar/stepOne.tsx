"use client";

import { Button, Flex, Image, Typography } from "antd";
import { useVehicleDetailQuery } from "@/app/api/productDetail/useProductDetailQuery";
import { formatNumber } from "@/utils/formatNumber";
import { calculateFinalPrice } from "@/utils/countPrice";
import { getVehicleFullName } from "@/utils/getVehicleFullName";

interface StepOneProps {
  vehicleId?: string | null;
  onNext?: () => void;
}

const StepOne = ({ vehicleId, onNext }: StepOneProps) => {
  const {
    data: vehicle,
    isLoading,
    error,
  } = useVehicleDetailQuery(vehicleId || null);

  const finalPrice = vehicle
    ? calculateFinalPrice(vehicle.basePrice, vehicle.discountPercent)
    : 0;

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img
          src="/images/loadcat.gif"
          alt="Loading..."
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  if (error) return <div>Error loading vehicle data</div>;

  return (
    <Flex vertical gap={40} align="center">
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Flex vertical>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-60, #4A4A50)",
              fontSize: 18,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            차량정보 확인
          </Typography.Text>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-70, #37373E)",
              fontSize: 28,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            차량 정보 및 예산 결제금액을 확인해주세요.
          </Typography.Text>
        </Flex>

        <Flex>/*Để rỗng đoạn này đã*/</Flex>
      </Flex>

      <Flex gap={20}>
        <Flex
          style={{
            width: "590px",
            height: "400px",
            background: "#F5F5F5",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: "100%", width: "100%" }}
            src={
              vehicle && vehicle.carImage?.length > 0
                ? vehicle.carImage[0]
                : "/images/default-car-image-detail.png"
            }
            alt="CarImage"
            preview={false}
          />
        </Flex>

        <Flex vertical gap={32} style={{ width: "610px" }}>
          <Flex vertical gap={8}>
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-70, #37373E)",
                fontSize: 24,
                fontFamily: "Noto Sans KR",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              {getVehicleFullName(vehicle!)}
            </Typography.Text>
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-50, #666670)",
                fontSize: 16,
                fontFamily: "Inter",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              {`${vehicle?.manufacturerYear}년형 · ${vehicle?.mileage && vehicle.mileage > 0 ? formatNumber(vehicle.mileage) : "-"}km · ${vehicle?.fuelType} · ${vehicle?.exteriorColor}`}
            </Typography.Text>
          </Flex>

          <Flex
            justify="space-between"
            style={{
              padding: "12px 16px",
              background: "var(--base-bg-color-base-bg-5, #F9F9F9)",
            }}
          >
            <div
              style={{
                color: "var(--base-fg-color-base-fg-60, #4A4A50)",
                fontSize: 14,
                fontFamily: "Noto Sans KR",
                fontWeight: "400",
                wordWrap: "break-word",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              총 결제 금액
            </div>
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--base-fg-color-base-fg-50, #666670)",
              }}
            >
              {formatNumber(finalPrice)}원
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      <Button
        style={{
          width: "450px",
          height: "56px",
          borderColor: "#2F2C4D",
          background: "#2F2C4D",
          color: "white",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
        onClick={onNext}
      >
        다음
      </Button>
    </Flex>
  );
};

export default StepOne;
