"use client"
import { Card, Row, Col, Typography, Image, Table, Empty, Flex } from "antd";
import { useState } from "react";

const carData = {
  image: "/images/placeholder-car.jpg",
  title: "15712345",
  description: "렉스턴 뉴렉스턴 2.2 4WD 레더리",
  year: "2022년8월",
  mileage: "78,000km",
  price: "대53",
};

const buyerInfo = {
  name: "User Information",
};

const paymentInfo = {
  paid: "10,000,000원",
  remain: "15,000,000원",
};

const transactionColumns = [
  {
    title: "Transaction Id",
    dataIndex: "transId",
    key: "transId",
    width: "33.33%",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: "33.33%",
  },
  {
    title: "Transaction Time",
    dataIndex: "transTime",
    key: "transTime",
    width: "33.33%",
  },
];

const PaymentView = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Flex
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f5f5f5",
      }
      }
    >
      <Card
        style={
          {
            width: "100%",
            maxWidth: "600px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }
        }
      >
        {/* Photo Section */}
        < div
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
            style={
              {
                width: "100px",
                height: "100px",
                backgroundColor: "#e8e8e8",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }
            }
          >
            <span style={{ color: "#999", fontSize: "14px" }}> Photo </span>
          </div>
          < div
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
              {carData.title}
            </div>
            < div
              style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
            >
              {carData.description}
            </div>
            < div style={{ fontSize: "12px", color: "#999" }}>
              {carData.year} · {carData.mileage} · {carData.price}
            </div>
          </div>
        </div>

        {/* Buyer Info Section */}
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
          <Flex justify="space-between" style={{ width: "100%", marginBottom: "8px" }}>
            <Typography.Text style={{ fontSize: "14px", color: "#000", fontWeight: 600 }}>
              구매자 정보
            </Typography.Text>
            < Image
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
          {
            isOpen && (
              <Flex vertical gap={8} style={{ width: "100%", padding: "10px" }}>
                <Row gutter={16}>
                  <Col span={6}>이름</Col>
                  < Col span={6} style={{ whiteSpace: "normal", overflowWrap: "break-word" }} >
                    SooTestInLive
                  </Col>
                  < Col span={6} >휴대폰 번호</Col>
                  < Col span={6} >010-1234-5678</Col>
                </Row>
                < Row gutter={16} >
                  <Col span={6}> E-mail </Col>
                  < Col span={6} style={{ whiteSpace: "normal", overflowWrap: "break-word" }}>SooTestInLive@gmail.com</Col>
                  < Col span={6} >희망 배송일</Col>
                  < Col span={6} >25-06-2026</Col>
                </Row>
              </Flex>
            )}
        </Flex>

        {/* Paid & Remain Section */}
        <Row gutter={16} style={{ marginBottom: "24px" }}>
          <Col span={12}>
            <div
              style={
                {
                  padding: "12px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  textAlign: "center",
                }
              }
            >
              <div
                style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
              >
                Paid:
              </div>
              < div style={{ fontSize: "14px", fontWeight: 600 }}>
                {paymentInfo.paid}
              </div>
            </div>
          </Col>
          < Col span={12} >
            <div
              style={
                {
                  padding: "12px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  textAlign: "center",
                }
              }
            >
              <div
                style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
              >
                Remain:
              </div>
              < div style={{ fontSize: "14px", fontWeight: 600 }}>
                {paymentInfo.remain}
              </div>
            </div>
          </Col>
        </Row>

        {/* Transaction Table */}
        <Table
          columns={transactionColumns}
          // dataSource={transactionData}
          pagination={false}
          locale={{ emptyText: <Empty description="No transactions" /> }}
          bordered
          style={{ marginTop: "20px" }}
        //   rowKey={(record, index) => index}
        />
      </Card>
    </Flex>
  )
}

export default PaymentView
