"use client";

import { Flex, Typography } from "antd";
import { Col, Row } from "antd";
import styles from "../ProductDetail.module.scss";
import { Vehicle } from "@/app/api/listPage/useVehiclesQuery";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import FuelType from "@/enums/fuel.enum";
import { EXTERIOR_COLOR_OPTIONS } from "@/constants/listPage/exterior-color/exterior-color-options";
import { getExteriorColorLabel } from "@/utils/getExteriorColorLabel";
import ExteriorColor from "@/enums/exterior-color.enum";
import { getInteriorColorLabel } from "@/utils/getInteriorColorLabel";
import { InteriorColor } from "@/enums/interior-color.enum";

const BasicVehicleInfo = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <Flex vertical gap={12}>
      <Typography.Text
      className={styles.title}
        style={{
          width: "100%",
          color: "var(--base-fg-color-base-fg-60, #4A4A50)",
          fontSize: 18,
          fontFamily: "Noto Sans KR",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        차량기본정보
      </Typography.Text>

      <Flex vertical className={styles["container"]} style={{ padding: "20px 24px" }}>
        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>최초등록</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{formatDate(vehicle.firstRegDate)}</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>주행거리</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{formatNumber(vehicle.mileage)}km</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>연료</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{FuelType[vehicle.fuelType as keyof typeof FuelType]}</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>배기량</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{formatNumber(vehicle.engineDisplacement)}cc</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>외관컬러</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{getExteriorColorLabel(vehicle.exteriorColor as ExteriorColor)}</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>내장컬러</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{getInteriorColorLabel(vehicle.interiorColor as InteriorColor)}</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>승차인원</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{vehicle.seatingCapacity}인승</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>차량번호</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{vehicle.carRegNo}</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>연식</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{vehicle.manufacturerYear}</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>연비</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>{vehicle.transmissionType}</Col>
        </Row>
        
      </Flex>
    </Flex>
  );
};

export default BasicVehicleInfo;
