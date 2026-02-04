"use client";

import { Flex, Typography } from "antd";
import React from "react";
import { Col, Row } from "antd";
import BasicVehicleInfo from "./BasicVehicleInfo/BasicVehicleInfo";
import PriceInfo from "./PriceInfo/PriceInfo";
import { useSearchParams } from "next/navigation";
import { useVehicleDetailQuery } from "@/app/api/productDetail/useProductDetailQuery";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { useRecoilState } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";
import { Vehicle } from "@/app/api/listPage/useVehiclesQuery";

const ProductDetailComponent = ({ vehicleDetail }: { vehicleDetail: Vehicle }) => {
  // const params = useSearchParams();
  // const { data: vehicleDetail, isFetching, isError } = useVehicleDetailQuery(params.get("id"));

  // if (isFetching) return <div>Loading...</div>;
  // if (isError) return <div>Error loading vehicle</div>;

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
            {getVehicleFullName(vehicleDetail!)}
          </Typography.Text>

          <BasicVehicleInfo vehicle={vehicleDetail!}/>

        </Flex>

        {/* Right content */}
        <Flex vertical style={{ width: "406px" }}>
          <PriceInfo vehicle={vehicleDetail!}/>
        </Flex>
      </Flex>
    </div>
  );
};

export default ProductDetailComponent;
