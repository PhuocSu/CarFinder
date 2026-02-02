"use client";

import { Button, Flex, Image, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./Compare.module.scss";
import { useCompare } from "@/hooks/useCompare";
import { useRecoilValue } from "recoil";
import { CarCompare, compareCarsState } from "@/store/compareStore.atom";
import React from "react";
import { useCompareQuery } from "@/app/api/compare/useCompareQuery";
import { useAuth } from "@/hooks/useAuth";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { calculateFinalPrice } from "@/utils/countPrice";
import { formatNumber } from "@/utils/formatNumber";
import FuelType from "@/enums/fuel.enum";
import { EXTERIOR_COLOR_OPTIONS } from "@/constants/listPage/exterior-color/exterior-color-options";
import { INTERIOR_COLOR_OPTIONS } from "@/constants/listPage/interior-color/interior-color-options";
import { useToggleCompareMutation } from "@/app/api/compare/useToggleCompareMutation";

const Compare = () => {
  const { isOpen, close } = useCompare();
  const { user } = useAuth();
  const { data: compareCarsData } = useCompareQuery(user?.sub);
  const toggleCompare = useToggleCompareMutation();

  const handleRemoveCompare = (carId: number) => {
    toggleCompare.mutate(carId);
  };

  const cars: CarCompare[] = React.useMemo(() => {
    if (!compareCarsData) return [];
    return compareCarsData.map((item: any) => ({
      id: item.car.id,
      carRegNo: item.car.carRegNo,
      brandName: item.car.brandName,
      subModelName: item.car.subModel?.subModelName || "",
      modelName: item.car.subModel?.model?.modelName || "",
      basePrice: item.car.basePrice,
      discountPercent: item.car.discountPercent,
      manufacturerYear: item.car.manufacturerYear,
      fuelType: item.car.fuelType,
      engineDisplacement: item.car.engineDisplacement,
      mileage: item.car.mileage,
      exteriorColor: item.car.exteriorColor,
      interiorColor: item.car.interiorColor,
      carImage: item.car.carImage || [],
    }));
  }, [compareCarsData]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: "600px", margin: "auto" }}>
          <Flex vertical gap={8} style={{ padding: "12px 24px 16px" }}>
            <Flex justify="space-between">
              <Typography.Text>차량비교</Typography.Text>
              <CloseOutlined onClick={close} />
            </Flex>

            <Flex
              style={{
                paddingBottom: "16px",
                borderBottom:
                  "1px var(--base-stroke-color-base-stroke-50, #606776) solid",
              }}
            >
              {cars.map((car, index) => {
                return (
                  <Flex
                    key={car.id}
                    vertical
                    gap={8}
                    className="compare__card"
                    style={{ width: "184px", padding: "0px 8px" }}
                  >
                    <Flex justify="space-between">
                      <Typography.Text>{car.carRegNo}</Typography.Text>
                      <CloseOutlined onClick={() => handleRemoveCompare(car.id)}/>
                    </Flex>

                    <Flex justify="center" vertical gap={8}>
                      <Image
                        src={
                          car.carImage?.[0] ||
                          "/images/default-car-image-detail.png"
                        }
                        preview={false}
                        style={{ objectFit: "contain", width: "100%", height: "104px" }}
                      />

                      <Typography.Text
                        style={{
                          width: "100%",
                          height: "40px",
                          padding: "2px",
                        }}
                      >
                        {car.modelName} {car.subModelName} {car.brandName}
                      </Typography.Text>

                      <Button
                        data-icon="none"
                        data-shownumber="true"
                        data-size="small"
                        data-state="enabled"
                        data-style="primary"
                        style={{
                          width: "100%",
                          height: "32px",
                          paddingLeft: 12,
                          paddingRight: 12,
                          background:
                            "var(--button-primary-bg-enabled, #3533CC)",
                          borderRadius: 2,
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 4,
                          display: "inline-flex",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--button-primary-fg, white)",
                            fontSize: 13,
                            fontFamily: "Noto Sans KR",
                            fontWeight: "400",
                            wordWrap: "break-word",
                          }}
                        >
                          상세보기
                        </span>
                      </Button>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>

            <Flex
              vertical
              style={{
                width: "100%",
                height: "calc(100vh - 400px)",
                overflowY: "auto",
                overflowX: "hidden",
                paddingRight: "8px",
              }}
            >
              {/* Giá xe */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    차량가격
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    {/* Price car 1 */}
                    {cars.map((car) => {
                      const finalPrice = calculateFinalPrice(
                        car.basePrice,
                        car.discountPercent,
                      );
                      return (
                        <Flex
                          key={car.id}
                          className={styles["flex__compare__content"]}
                          justify="center"
                          align="center"
                          style={{ padding: "8px 0px", width: "180px" }}
                        >
                          <Typography.Text
                            className={styles["compare__content"]}
                          >
                            {formatNumber(finalPrice / 10000)}만원
                          </Typography.Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>

              {/* Year */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    연식
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    {cars.map((car) => {
                      return (
                        <Flex
                          key={car.id}
                          className={styles["flex__compare__content"]}
                          justify="center"
                          align="center"
                          style={{ padding: "8px 0px", width: "180px" }}
                        >
                          <Typography.Text
                            className={styles["compare__content"]}
                          >
                            {car.manufacturerYear}년형
                          </Typography.Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>

              {/* Mileage */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    주행거리
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    {cars.map((car) => {
                      return (
                        <Flex
                          key={car.id}
                          className={styles["flex__compare__content"]}
                          justify="center"
                          align="center"
                          style={{ padding: "8px 0px", width: "180px" }}
                        >
                          <Typography.Text
                            className={styles["compare__content"]}
                          >
                            {formatNumber(car.mileage)}km
                          </Typography.Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>

              {/* Fuel */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    연료/배기량
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    {cars.map((car) => {
                      return (
                        <Flex
                          key={car.id}
                          className={styles["flex__compare__content"]}
                          justify="center"
                          align="center"
                          style={{ padding: "8px 0px", width: "180px" }}
                        >
                          <Typography.Text
                            className={styles["compare__content"]}
                          >
                            {FuelType[car.fuelType as keyof typeof FuelType]}/
                            {car.engineDisplacement}
                          </Typography.Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>

              {/* Exterior Color */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    외관색상
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    {cars.map((car) => {
                      return (
                        <Flex
                          key={car.id}
                          className={styles["flex__compare__content"]}
                          justify="center"
                          align="center"
                          style={{ padding: "8px 0px", width: "180px" }}
                        >
                          <Typography.Text
                            className={styles["compare__content"]}
                          >
                            {EXTERIOR_COLOR_OPTIONS.find(
                              (option) => option.key === car.exteriorColor,
                            )?.label}
                          </Typography.Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>

              {/* Interior Color */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    내장색상
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    {cars.map((car) => {
                      return (
                        <Flex
                          key={car.id}
                          className={styles["flex__compare__content"]}
                          justify="center"
                          align="center"
                          style={{ padding: "8px 0px", width: "180px" }}
                        >
                          <Typography.Text
                            className={styles["compare__content"]}
                          >
                            {INTERIOR_COLOR_OPTIONS.find(
                              (option) => option.key === car.interiorColor,
                            )?.label}
                          </Typography.Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Compare;
