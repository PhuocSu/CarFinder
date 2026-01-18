"use client";

import { vehicleFilterState } from "@/store/VehicleFilter.atom";
import { useRecoilState } from "recoil";
import { Pagination } from "antd";

type Props = {
  total: number;
};

const VehiclePagination = ({ total }: Props) => {
    const [filter, setFilter] = useRecoilState(vehicleFilterState);

    return (
        <Pagination
            current={filter.page}
            total={total}
            pageSize={filter.pageSize}
            onChange={(page) => setFilter({ ...filter, page })}
            showSizeChanger={false}
            style={{ textAlign: "center", marginTop: 32 }}
        />
    )
}

export default VehiclePagination
