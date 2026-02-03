"use client";

import { Flex, Typography } from "antd";
import React from "react";
import { Col, Row } from "antd";
import BasicVehicleInfo from "./BasicVehicleInfo/BasicVehicleInfo";
import PriceInfo from "./PriceInfo/PriceInfo";

const ProductDetailComponent = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Flex>
        {/* Left content */}
        <Flex gap={32} vertical style={{ width: "794px", padding: "0 10px 0 0" }}>
          <Typography.Text
            style={{
              width: "100%",
              color: "var(--primary-fg-color-primary-fg-95, #2F2C4D)",
              fontSize: 24,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            더 뉴렉스턴 스포츠 칸 쿨멘 2.2 4 WD 노블레스
          </Typography.Text>

          <BasicVehicleInfo />

        </Flex>

        {/* Right content */}
        <Flex vertical style={{ width: "406px" }}>
            <PriceInfo />
        </Flex>
      </Flex>
    </div>
  );
};

export default ProductDetailComponent;
