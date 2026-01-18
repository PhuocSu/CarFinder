"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useRecoilState } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";

const VehicleSearchBox = () => {
  const  [searchState, setSearchState] = useRecoilState(vehicleFilterState);

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
      value={searchState.search}
      onChange={(e) => setSearchState({ ...searchState, search: e.target.value })}
    />  
  );
};

export default VehicleSearchBox;
