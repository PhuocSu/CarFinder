"use client";

import { Col, Flex, Row, Typography } from "antd";
import { useVehicles, Vehicle } from "@/app/api/listPage/useVehicles";
import CarCard from "@/app/components/ui/cards/CarCard";
import VehiclePagination from "@/app/components/ui/pagination/VehiclePagination";
import { useRecoilValue } from "recoil";
import { vehicleFilterReadSelector } from "@/selectors/VehicleFilter.selectors";


const VehicleList = () => {
  const filter = useRecoilValue(vehicleFilterReadSelector);
  const { data: vehicles, isLoading, isError } = useVehicles();

  console.log("vehicles data:", vehicles);
  console.log("filter state:", filter);

  if (isError) {
    return (
      <div className="text-red-500 p-4">Something went wrong. Try later!</div>
    );
  }

  return (
    <Flex vertical gap={20} style={{ width: "100%" }}>
      {/* Special Price */}
      <Flex vertical gap={24}>
        <Typography.Text
          style={{
            color: "var(--base-fg-color-base-fg-60, #4A4A50)",
            fontSize: 24,
            fontFamily: "Noto Sans KR",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Special Price
        </Typography.Text>

        <Row gutter={[20, 20]}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            vehicles?.data
              ?.filter((vehicle: Vehicle) => vehicle.discountPercent > 0)
              .map((vehicle: Vehicle) => (
                <Col span={8} key={vehicle.id}>
                  <CarCard vehicle={vehicle} />
                </Col>
              ))
          )}
        </Row>
      </Flex>

      {/* basePrice */}
      <Flex vertical gap={24}>
        <Typography.Text
          style={{
            color: "var(--base-fg-color-base-fg-60, #4A4A50)",
            fontSize: 24,
            fontFamily: "Noto Sans KR",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          일반 차량
        </Typography.Text>

        <Row gutter={[20, 20]}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            vehicles?.data
              ?.filter((vehicle: Vehicle) => vehicle.discountPercent === 0)
              .map((vehicle: Vehicle) => (
                <Col span={8} key={vehicle.id}>
                  <CarCard vehicle={vehicle} />
                </Col>
              ))
          )}
        </Row>
      </Flex>

      <Flex style={{ width: "100%", justifyContent: "center" }}>
        <VehiclePagination total={vehicles?.total || 0} />
      </Flex>
    </Flex>
  );
};

export default VehicleList;
