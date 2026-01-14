"use client";

import { Select } from "antd";
import { SORT_LIST_OPTIONS } from "@/constants/listPage/sort-list/sort-list-options";
import { useState } from "react";

const VehicleSortDropdown = () => {
  const [value, setValue] = useState("latest");

  return (
    <Select
      options={SORT_LIST_OPTIONS}
      value={value}
      onChange={(val) => setValue(val)}
      style={{ width: 160, height: 40 }}
    />
  );
};

export default VehicleSortDropdown;
