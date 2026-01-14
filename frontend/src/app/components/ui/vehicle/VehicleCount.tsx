"use client";

import { Typography } from "antd";

const VehicleCount = () => {
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
        전체 40대
      </Typography.Text>
  );
};

export default VehicleCount;
