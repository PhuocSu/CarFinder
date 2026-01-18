"use client";

import { Select } from "antd";
import { SORT_LIST_OPTIONS } from "@/constants/listPage/sort-list/sort-list-options";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";

const VehicleSortDropdown = () => {
  const [filter, setFilter] = useRecoilState(vehicleFilterState);

  const handleChange = (value: string) => {
    switch (value) {
      case "latest":
        setFilter((prev) => ({
          ...prev,
          sortBy: undefined,
          order: "desc",
          page: 1,
        }));
        break;
  
      case "price_low":
        setFilter((prev) => ({
          ...prev,
          sortBy: "price",
          order: "asc",
          page: 1,
        }));
        break;
  
      case "price_high":
        setFilter((prev) => ({
          ...prev,
          sortBy: "price",
          order: "desc",
          page: 1,
        }));
        break;
  
      case "recent":
        setFilter((prev) => ({
          ...prev,
          sortBy: "year",
          order: "desc",
          page: 1,
        }));
        break;
  
      case "mileage":
        setFilter((prev) => ({
          ...prev,
          sortBy: "mileage",
          order: "asc",
          page: 1,
        }));
        break;
    }
  };

  const selectedValue = (() => {
    if (!filter.sortBy) return "latest";
  
    if (filter.sortBy === "price" && filter.order === "asc") return "price_low";
    if (filter.sortBy === "price" && filter.order === "desc") return "price_high";
    if (filter.sortBy === "year") return "recent";
    if (filter.sortBy === "mileage") return "mileage";
  
    return "latest";
  })();
  

  return (
    <Select
      options={SORT_LIST_OPTIONS}
      value={selectedValue}
      onChange={handleChange}
      style={{ width: 160, height: 40 }}
    />
  );
};

export default VehicleSortDropdown;
