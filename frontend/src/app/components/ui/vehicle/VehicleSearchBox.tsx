"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const VehicleSearchBox = () => {
  return (
    <Input
      placeholder="차량번호 및 차종"
      style={{
        width: 240,
        height: 40,
        borderRadius: 12,
        border: "1px solid rgb(206, 206, 211)",
      }}
      suffix={<SearchOutlined />}
    />
  );
};

export default VehicleSearchBox;
