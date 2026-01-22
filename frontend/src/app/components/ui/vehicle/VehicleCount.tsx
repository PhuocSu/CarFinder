"use client";

import { Typography } from "antd";
import { useVehiclesQuery } from "@/app/api/listPage/useVehiclesQuery";

const VehicleCount = () => {
    const { data: vehicles } = useVehiclesQuery();
  return (
      <Typography.Text
        style={{
          height: 40,
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "var(--base-fg-color-base-fg-70, #37373E)",
          fontSize: 28,
          fontFamily: "Noto Sans KR",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        {`전체 ${vehicles?.total}대`}
      </Typography.Text>
  );
};

export default VehicleCount;
