"use client";
import { usePaymentsView } from "@/app/api/payments/usePaymentsView";
import { calculateFinalPrice } from "@/utils/countPrice";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import {
  Card,
  Row,
  Col,
  Typography,
  Image,
  Table,
  Empty,
  Flex,
  Button,
} from "antd";
import { useState } from "react";

type PaymentViewProps = {
  contractId: number;
};

const transactionColumns = [
  {
    title: "Transaction Id",
    dataIndex: "transactionRef",
    key: "transactionRef",
  },
  {
    title: "Order Id",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "statusPayment",
    key: "statusPayment",
  },
  {
    title: "Transaction Time",
    dataIndex: "paidAt",
    key: "paidAt",
  },
];

const PaymentView = ({ contractId }: PaymentViewProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { data: payments, isLoading } = usePaymentsView({ contractId });

  const latestPayment = payments?.[0];
  const car = latestPayment?.contract?.car;
  const totalAmount = calculateFinalPrice(
    car?.basePrice || 0,
    car?.discountPercent || 0,
  );
  const paidAmount =
    payments?.reduce((total, payment) => {
      return payment.statusPayment === "SUCCESS"
        ? total + Number(payment.amount || 0)
        : total;
    }, 0) || 0;
  const remainedAmount = Math.max(totalAmount - paidAmount, 0);

  const transactionData =
    payments?.map((payment) => ({
      key: payment.id,
      transactionRef: payment.transactionRef || "-",
      orderId: payment.orderId || "-",
      amount: formatNumber(Number(payment.amount) || 0),
      statusPayment: payment.statusPayment || "-",
      paidAt: payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "-",
    })) || [];

  return (
    <Flex
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "80px",
              backgroundColor: "#e8e8e8",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={
                car?.carImage?.length
                  ? car.carImage[0]
                  : "/images/default-car-image-detail.png"
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{ fontWeight: 600, fontSize: "16px", marginBottom: "4px" }}
            >
              {latestPayment?.contract?.car?.carRegNo}
            </div>
            <div
              style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
            >
              {latestPayment?.contract?.car ? getVehicleFullName(car) : ""}
            </div>
            <div style={{ fontSize: "12px", color: "#999" }}>
              {car?.manufacturerYear} · {formatNumber(car?.mileage || 0)}km ·{" "}
              {car?.fuelType}
            </div>
            <div
              style={{ fontSize: "16px", color: "#EF4444", fontWeight: "bold" }}
            >
              {formatNumber(totalAmount)}원
            </div>
          </div>
        </div>

        <Flex justify="flex-end">
          <Button
            type="primary"
            style={{
              height: "40px",
              marginBottom: "20px",
              background: "#2F2C4D",
              borderColor: "#2F2C4D",
            }}
          >
            구매 완료
          </Button>
        </Flex>

        <Flex
          vertical
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            marginBottom: "20px",
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Flex
            justify="space-between"
            style={{ width: "100%", marginBottom: "8px" }}
          >
            <Typography.Text
              style={{ fontSize: "14px", color: "#000", fontWeight: 600 }}
            >
              구매자 정보
            </Typography.Text>
            <Image
              src="/images/listPage/icon-chevron-down.svg"
              preview={false}
              width={20}
              height={20}
              onClick={() => setIsOpen((prev) => !prev)}
              style={{
                cursor: "pointer",
                color: "#3533CC",
                transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </Flex>
          {isOpen && (
            <Flex vertical gap={8} style={{ width: "100%", padding: "10px" }}>
              <Row gutter={16}>
                <Col span={6}>이름</Col>
                <Col
                  span={6}
                  style={{ whiteSpace: "normal", overflowWrap: "break-word" }}
                >
                  {latestPayment?.contract?.buyerName}
                </Col>
                <Col span={6}>휴대폰 번호</Col>
                <Col span={6}>{latestPayment?.contract?.buyerPhone}</Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>E-mail</Col>
                <Col
                  span={6}
                  style={{ whiteSpace: "normal", overflowWrap: "break-word" }}
                >
                  {latestPayment?.contract?.buyerEmail}
                </Col>
                <Col span={6}>희망 배송일</Col>
                <Col span={6}>
                  {latestPayment?.contract?.desiredDeliveryDate
                    ? formatDate(
                        new Date(
                          latestPayment.contract.desiredDeliveryDate,
                        ).toLocaleDateString("ko-KR"),
                      )
                    : ""}
                </Col>
              </Row>
            </Flex>
          )}
        </Flex>

        <Row gutter={16} style={{ marginBottom: "24px" }}>
          <Col span={12}>
            <div
              style={{
                padding: "12px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
              >
                Paid:
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>
                {formatNumber(paidAmount)}원
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: "12px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
              >
                Remain:
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>
                {formatNumber(remainedAmount)}원
              </div>
            </div>
          </Col>
        </Row>

        <Table
          loading={isLoading}
          columns={transactionColumns}
          dataSource={transactionData}
          pagination={false}
          locale={{ emptyText: <Empty description="No transactions" /> }}
          bordered
        />
      </Card>
    </Flex>
  );
};

export default PaymentView;
