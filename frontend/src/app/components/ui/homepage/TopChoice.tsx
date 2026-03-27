"use client";

import { useTopFavoriteQuery } from "@/app/api/homepage/useTopFavoriteQuery";
import { Col, Flex, Row, Spin } from "antd";
import { Typography } from "antd";
import CarCard from "../cards/CarCard";

const TopChoice = () => {
    const {data, isLoading, error} = useTopFavoriteQuery(3);

    if (isLoading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <img src="/images/loadcat.gif" alt="Loading..." style={{ width: '100px', height: '100px' }} />
        </div>
    );
    if (error) return <div>Error loading top cars</div>;

    return (
    <div style={{ width: "1200px", margin: "0 auto", boxSizing: "border-box" }}>
      <Flex vertical gap={20}>
        <Typography.Text>Top Choice</Typography.Text>

        <Flex gap={20} style={{ width: "100%" }}>
          {data?.map((car: any, index: number) => (
            <div key={car.id}>
              <CarCard vehicle={car} rankIndex={index}/>
            </div>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default TopChoice;
