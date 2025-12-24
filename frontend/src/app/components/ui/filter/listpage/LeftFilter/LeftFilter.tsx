"use client";

import { Flex } from "antd";
import ModelSearch from "./Model/ModelSearch";
import CarTypeSearch from "./CarType/CarTypeSearch";
import YearSearch from "./Year/YearSearch";
import PriceSearch from "./Price/PriceSearch";
import MileageSearch from "./Mileage/MileageSearch";
import FuelSearch from "./Fuel/FuelSearch";
import ExteriorColorSearch from "./ExteriorColor/ExteriorColorSearch";
import InteriorColorSearch from "./InteriorColor/InteriorColorSearch";

const LeftFilter = () => {
  return (
    <Flex vertical style={{ width: "300px", height: "100%" }}>
      <ModelSearch />
      <CarTypeSearch />
      <YearSearch />
      <PriceSearch />
      <MileageSearch />
      <FuelSearch />
      <ExteriorColorSearch />
      <InteriorColorSearch />
    </Flex>
  )
};

export default LeftFilter;
