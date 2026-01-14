"use client"

import VehicleCount from "@/app/components/ui/vehicle/VehicleCount"
import VehicleSearchBox from "@/app/components/ui/vehicle/VehicleSearchBox"
import VehicleSortDropdown from "@/app/components/ui/vehicle/VehicleSortDropdown"
import { Flex } from "antd"

const VehicleListHeader = () => {
    return (
        <Flex justify="space-between" style={{ width: "100%", paddingBottom: "13px", borderBottom: "1px solid rgb(224, 224, 227)" }}>
            <VehicleCount />

            <Flex gap={8}>
                <VehicleSearchBox />
                <VehicleSortDropdown />
            </Flex>
        </Flex>
    )
}

export default VehicleListHeader
