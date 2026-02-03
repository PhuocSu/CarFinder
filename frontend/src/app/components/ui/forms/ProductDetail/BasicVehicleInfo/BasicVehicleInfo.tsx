"use client";

import { Flex, Typography } from "antd";
import { Col, Row } from "antd";
import styles from "../ProductDetail.module.scss";

const BasicVehicleInfo = () => {
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
          <Col className={styles["basic-vehicle-info__value"]} span={6}>2024-01-08</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>주행거리</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>8,799 km</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>연료</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>가솔린</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>배기량</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>1,597 cc</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>외관컬러</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>흰색</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>내장컬러</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>검정색 계열</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>승차인원</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>5인승</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>차량번호</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>129더7481</Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>연식</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>2024년형</Col>
          <Col className={styles["basic-vehicle-info__title"]} span={6}>연비</Col>
          <Col className={styles["basic-vehicle-info__value"]} span={6}>11.6km/L (3등급)</Col>
        </Row>
        
      </Flex>
    </Flex>
  );
};

export default BasicVehicleInfo;
