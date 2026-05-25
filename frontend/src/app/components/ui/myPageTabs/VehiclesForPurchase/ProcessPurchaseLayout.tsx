"use client";

import { Button, Card, Col, Flex, Row, Steps, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PurchaseContractReview from "../../buyMyCar/Contract/PurchaseContractReview";
import { useRecoilValue } from "recoil";
import { authState } from "@/store/authStore.atom";
import { useBuyerContractQuery } from "@/app/api/purchaseContract/useBuyerContractQuery";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { VehicleBadge } from "@/enums/vehicle-badge.enum";
import { formatDate } from "@/utils/formatDate";
import { calculateFinalPrice } from "@/utils/countPrice";
import { formatNumber } from "@/utils/formatNumber";

const ProcessPurchaseLayout = () => {
  const router = useRouter();
  const [contractModalVisible, setContractModalVisible] = useState(false);

  const { user } = useRecoilValue(authState);
  const [selectedContractId, setSelectedContractId] = useState<number | null>(null);

  const buyerId = user?.sub ? Number(user.sub) : null;
  const { data: contracts, isLoading, error } = useBuyerContractQuery(buyerId);

  const handleContractModalOpen = (contractId?: number) => {
    setSelectedContractId(contractId || null);
    setContractModalVisible(true);
  };

  const handleContractModalClose = () => {
    setContractModalVisible(false);
    setSelectedContractId(null);
  };

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

  if (error) {
    return <div>Failed to load contracts</div>;
  }

  if (!contracts || contracts.length === 0) {
    return <div>No contracts found</div>;
  }

  return (
    <Flex vertical gap={16} style={{ marginTop: "20px" }}>
      {contracts.map((contract) => {
        return (
          <Card
            key={contract.id}
            style={{
              width: "100%",
              borderRadius: 4,
              border: "1px solid #E0E0E3",
            }}
          >
            {/* Tiêu đề */}
            <Flex
              justify="space-between"
              style={{ borderBottom: "1px solid #E0E0E3" }}
            >
              <Row style={{ display: "flex", alignItems: "center" }}>
                <Typography.Title
                  level={4}
                  style={{ color: "#666670", margin: 0 }}
                >
                  구매차량
                </Typography.Title>
              </Row>

              {/* Steps tiến trình */}
              <Row style={{ paddingBottom: "24px" }}>
                <Steps
                  style={{ width: "600px" }}
                  current={0}
                  direction="horizontal"
                  labelPlacement="vertical"
                  items={[
                    { title: "계약진행 요청" },
                    { title: "매매계약서 작성" },
                    { title: "결제진행" },
                    { title: "결제완료" },
                    { title: "출고 완료" },
                  ]}
                />
              </Row>
            </Flex>

            {/* Nội dung chính */}
            <Row gutter={20} style={{ padding: 24 }}>
              {/* Hình ảnh xe */}
              <Col span={8}>
                <img
                  src={
                    contract.car?.carImage?.length > 0
                      ? contract.car.carImage[0]
                      : "/images/default-car-image-detail.png"
                  }
                  style={{ width: "100%", borderRadius: 6 }}
                />
              </Col>

              {/* Thông tin xe */}
              <Col span={16}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Typography.Title
                      level={5}
                      style={{ margin: 0, color: "#37373E" }}
                    >
                      {getVehicleFullName(contract.car)}
                    </Typography.Title>
                    <Row gutter={8}>
                      {contract.car.vehicleBadge?.map(
                        (badge: string, index: number) => (
                          <Col key={index}>
                            <Button
                              size="small"
                              shape="round"
                              style={{ background: "#6427C2", color: "white" }}
                            >
                              {VehicleBadge[badge as keyof typeof VehicleBadge]}
                            </Button>
                          </Col>
                        ),
                      )}
                    </Row>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <Typography.Text style={{ color: "#666670" }}>
                      {contract.createdAt ? formatDate(contract.createdAt) : ""}
                    </Typography.Text>
                    <br />
                    <Button
                      type="primary"
                      style={{
                        background: "#2F2C4D",
                        borderColor: "#2F2F46",
                        marginTop: 8,
                        height: "36px",
                      }}
                    >
                      계약진행요청
                    </Button>
                  </Col>
                </Row>

                {/* Nút hành động */}
                <Row gutter={8} style={{ marginTop: 24, height: "52px" }}>
                  <Col span={12}>
                    <Button
                      block
                      style={{
                        borderColor: "#CECED3",
                        color: "#666670",
                        height: "100%",
                      }}
                      onClick={() => handleContractModalOpen(contract.id)}
                    >
                      계약서 다시보기 - Xem lại hợp đồng
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      block
                      type="primary"
                      style={{
                        height: "100%",
                        background: "#2F2C4D",
                        borderColor: "#2F2C4D",
                      }}
                      onClick={() => router.push("/payment/view")}
                    >
                      결제하기
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Thông tin hợp đồng */}
            <Row style={{ padding: "16px 24px" }} justify="space-between">
              <Col>
                <Typography.Text>차량번호</Typography.Text>
                <br />
                <Typography.Text>계약서 번호</Typography.Text>
                <br />
                <Typography.Text>가상계좌 번호</Typography.Text>
                <br />
                <Typography.Text>미결제 금액</Typography.Text>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <Typography.Text strong>{contract.car.carRegNo}</Typography.Text>
                <br />
                <Typography.Text strong>{contract.contractNumber}</Typography.Text>
                <br />
                <Typography.Text strong>신한 123456789001231</Typography.Text>
                <br />
                <Typography.Text strong style={{ color: "#EF4444" }}>
                  {formatNumber(calculateFinalPrice(contract.car.basePrice, contract.car.discountPercent))}원
                </Typography.Text>
              </Col>
            </Row>

            <PurchaseContractReview
              visible={contractModalVisible}
              onClose={handleContractModalClose}
              contractId={selectedContractId}
            />
          </Card>
        );
      })}
    </Flex>
  );
};

export default ProcessPurchaseLayout;
