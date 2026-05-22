"use client";

import { Button, Card, Col, Flex, Image, Row, Typography } from "antd";
import { useVehicleDetailQuery } from "@/app/api/productDetail/useProductDetailQuery";
import { formatNumber } from "@/utils/formatNumber";
import { calculateFinalPrice } from "@/utils/countPrice";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PurchaseContract from "./Contract/PurchaseContract";
import { useRecoilValue } from "recoil";
import { buyMyCarFormState } from "@/store/buyMyCar.atom";
import { createdPurchaseContractState } from "@/store/createdPurchaseContractState.atom";

interface StepThreeProps {
  vehicleId?: string | null;
}

const StepThree = ({ vehicleId }: StepThreeProps) => {
  const {
    data: vehicle,
    isLoading,
    error,
  } = useVehicleDetailQuery(vehicleId || null);

  const router = useRouter();
  const [contractModalVisible, setContractModalVisible] = useState(false);

  const finalPrice = vehicle
    ? calculateFinalPrice(vehicle.basePrice, vehicle.discountPercent)
    : 0;

  const formData = useRecoilValue(buyMyCarFormState);
  const createdContract = useRecoilValue(createdPurchaseContractState);


  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img
          src="/images/loadcat.gif"
          alt="Loading..."
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  if (error) return <div>Error loading vehicle data</div>;

  const handleMyPageClick = () => {
    router.push("/myPage?tab=VehiclesForPurchase");
  };

  const handleContractModalOpen = () => {
    setContractModalVisible(true);
  };

  const handleContractModalClose = () => {
    setContractModalVisible(false);
  };

  return (
    <Flex vertical gap={40} align="center">
      <Flex justify="space-between" style={{ width: "788px" }}>
        <Flex vertical>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-60, #4A4A50)",
              fontSize: 18,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            주문신청 완료
          </Typography.Text>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-70, #37373E)",
              fontSize: 28,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            차량 주문신청이 완료되었습니다.
          </Typography.Text>
        </Flex>

        <Flex>/*Để rỗng đoạn này đã*/</Flex>
      </Flex>

      <Flex gap={20} style={{ width: "788px" }}>
        <Flex
          style={{
            height: "130px",
            background: "#F5F5F5",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: "100%", width: "196px" }}
            src={
              vehicle && vehicle.carImage?.length > 0
                ? vehicle.carImage[0]
                : "/images/default-car-image-detail.png"
            }
            alt="CarImage"
            preview={false}
          />
        </Flex>

        <Flex vertical gap={16} style={{ width: "610px" }}>
          <Flex vertical gap={8}>
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-70, #333C55)",
                fontSize: 14,
                fontFamily: "Noto Sans KR",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              183조1916
            </Typography.Text>
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-70, #37373E)",
                fontSize: 24,
                fontFamily: "Noto Sans KR",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              {getVehicleFullName(vehicle!)}
            </Typography.Text>
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-50, #666670)",
                fontSize: 16,
                fontFamily: "Inter",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              {`${vehicle?.manufacturerYear}년형 · ${vehicle?.mileage && vehicle.mileage > 0 ? formatNumber(vehicle.mileage) : "-"}km · ${vehicle?.fuelType} · ${vehicle?.exteriorColor}`}
            </Typography.Text>
          </Flex>

          <Flex gap={8}>
            <div
              style={{
                color: "var(--base-fg-color-base-fg-60, #4A4A50)",
                fontSize: 14,
                fontFamily: "Noto Sans KR",
                fontWeight: "400",
                wordWrap: "break-word",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              최종결제 금액
            </div>
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--base-fg-color-base-fg-50, #666670)",
              }}
            >
              {formatNumber(finalPrice)}원
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      <Card
        style={{
          width: "788px",
          height: "100%",
          padding: 24,
          borderRadius: 2,
          border: "1px solid #E0E0E3",
        }}
      >
        <Row gutter={[64, 16]}>
          <Col span={12}>
            <Row align="middle" gutter={10}>
              <Col style={{ width: 124 }}>
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 400 }}
                >
                  성명
                </Typography.Text>
              </Col>
              <Col flex="auto">
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 700 }}
                >
                  {createdContract?.buyerName}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row align="middle" gutter={10}>
              <Col style={{ width: 124 }}>
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 400 }}
                >
                  명의
                </Typography.Text>
              </Col>
              <Col flex="auto">
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 700 }}
                >
                  개인명의
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[64, 16]}>
          <Col span={12}>
            <Row align="middle" gutter={10}>
              <Col style={{ width: 124 }}>
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 400 }}
                >
                  이메일
                </Typography.Text>
              </Col>
              <Col flex="auto">
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 700 }}
                >
                  {createdContract?.buyerEmail}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row align="middle" gutter={10}>
              <Col style={{ width: 124 }}>
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 400 }}
                >
                  전화번호
                </Typography.Text>
              </Col>
              <Col flex="auto">
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 700 }}
                >
                  {createdContract?.buyerPhone}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[64, 16]}>
          <Col span={12}>
            <Row align="middle" gutter={10}>
              <Col style={{ width: 124 }}>
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 400 }}
                >
                  희망 배송일
                </Typography.Text>
              </Col>
              <Col flex="auto">
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 700 }}
                >
                  {createdContract?.desiredDeliveryDate}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row align="middle" gutter={10}>
              <Col style={{ width: 124 }}>
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 400 }}
                >
                  수령 방법
                </Typography.Text>
              </Col>
              <Col flex="auto">
                <Typography.Text
                  style={{ fontSize: 14, color: "#4A4A50", fontWeight: 700 }}
                >
                  배송요청
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Flex gap={8} style={{ width: "788px" }}>
        <Button
          style={{
            width: "100%",
            height: "56px",
            color: "var(--button-tertiary-fg-enabled, #666670)",
            fontSize: 16,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
          onClick={handleMyPageClick}
        >
          마이페이지로 가기
        </Button>
        <Button
          style={{
            width: "100%",
            height: "56px",
            borderColor: "#2F2C4D",
            background: "#2F2C4D",
            color: "white",
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
          onClick={handleContractModalOpen}
        >
          매매계약서 작성하기
        </Button>

        <PurchaseContract
          visible={contractModalVisible}
          onClose={handleContractModalClose}
          vehicleId={vehicleId}
        />
      </Flex>
    </Flex>
  );
};

export default StepThree;
