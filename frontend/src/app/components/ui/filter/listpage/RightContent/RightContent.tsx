"use client"

import { Flex } from "antd"
import VehicleListHeader from "./VehicleListHeader/VehicleListHeader"
import VehicleList from "./VehicleList/VehicleList"

const RightContent = () => {
    return (
        <Flex vertical style={{ width: "100%" }}>
            <VehicleListHeader />
            <VehicleList />
        </Flex>
    )
}

export default RightContent
