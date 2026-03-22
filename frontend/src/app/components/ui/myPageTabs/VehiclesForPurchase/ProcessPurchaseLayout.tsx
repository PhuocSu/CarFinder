"use client";

import { BorderBottomOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Row, Steps, Typography } from "antd";

const ProcessPurchaseLayout = () => {
  return (
    <Card
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
          <Typography.Title level={4} style={{ color: "#666670", margin: 0 }}>
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
            src="https://placehold.co/330x181"
            alt="Car"
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
                싼타페 신형 싼타페 R2.0 2WD 프리미엄
              </Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Button
                    size="small"
                    shape="round"
                    style={{ background: "#6427C2", color: "white" }}
                  >
                    텍스트
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="small"
                    shape="round"
                    style={{ background: "#6D6D6D", color: "white" }}
                  >
                    텍스트
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="small"
                    shape="round"
                    style={{ background: "#6D6D6D", color: "white" }}
                  >
                    텍스트
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Typography.Text style={{ color: "#666670" }}>
                2025-03-21
              </Typography.Text>
              <br />
              <Button
                type="primary"
                style={{
                  background: "#2F2C4D",
                  borderColor: "#2F2F46",
                  marginTop: 8,
                  height: "36px"
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
                style={{ borderColor: "#CECED3", color: "#666670", height: "100%" }}
              >
                메인페이지로 가기
              </Button>
            </Col>
            <Col span={12}>
              <Button block type="primary" style={{ height: "100%", background: "#2F2C4D", borderColor: "#2F2C4D" }}>
                매매계약서 작성하기
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
          <Typography.Text strong>123가4567</Typography.Text>
          <br />
          <Typography.Text strong>KG-P-123456호</Typography.Text>
          <br />
          <Typography.Text strong>신한 123456789001231</Typography.Text>
          <br />
          <Typography.Text strong style={{ color: "#EF4444" }}>
            32,500,000원
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ProcessPurchaseLayout;
