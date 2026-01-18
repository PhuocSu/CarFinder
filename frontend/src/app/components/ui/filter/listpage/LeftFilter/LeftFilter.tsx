"use client";

import { Flex } from "antd";
import BadgeSearch from "./Badge/BadgeSearch";
import YearSearch from "./Year/YearSearch";
import PriceSearch from "./Price/PriceSearch";
import MileageSearch from "./Mileage/MileageSearch";
import FuelSearch from "./Fuel/FuelSearch";
import ExteriorColorSearch from "./ExteriorColor/ExteriorColorSearch";
import InteriorColorSearch from "./InteriorColor/InteriorColorSearch";
import SearchToolbars from "./SearchToolbars/SearchToolbars";
import ModelSearch from "./Model/ModelSearch";

const LeftFilter = () => {
  return (
    <Flex vertical style={{ width: "300px", height: "100%" }}>
      <SearchToolbars />
      <BadgeSearch />
      <ModelSearch />
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
