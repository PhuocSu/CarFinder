"use client";

import { Col, Flex, Row, Typography } from "antd";
import { useVehicles } from "@/app/api/listPage/useVehicles";
import CarCard from "@/app/components/ui/cards/CarCard";

const VehicleList = () => {
  const {data: vehicles, isLoading, isError} = useVehicles();

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        Something went wrong. Try later!
      </div>
    );
  }

  return (
    <Flex vertical gap={24} style={{ width: "100%" }}>
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
        {vehicles?.map((vehicle) => (
          <Col span={8} key={vehicle.id}>
            <CarCard vehicle={vehicle} />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default VehicleList;
