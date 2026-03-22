"use client";

import { Button, Row, Typography } from "antd";

const CancelPurchaseLayout = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingTop: 24,
        paddingBottom: 24,
        borderBottom: "1px solid #E0E0E3",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        {/* Khối trên */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography.Text
            style={{ fontSize: 16, fontWeight: 700, color: "#4A4A50" }}
          >
            123우8765
          </Typography.Text>
          <Row justify="space-between">
            <Typography.Text
              style={{ fontSize: 16, fontWeight: 400, color: "#37373E" }}
            >
              싼타페 신형 싼타페 R2.0 2WD 프리미엄
            </Typography.Text>
            <Typography.Text
              style={{ fontSize: 15, fontWeight: 400, color: "#666670" }}
            >
              2025-03-21
            </Typography.Text>
          </Row>
        </div>

        {/* Khối dưới */}
        <Row justify="space-between">
          <Typography.Text
            style={{ fontSize: 18, fontWeight: 700, color: "#37373E" }}
          >
            32,500,000원
          </Typography.Text>
          <Button
            style={{
              padding: "8px 20px",
              borderRadius: 2,
              border: "1px solid #E0E0E3",
              background: "white",
              fontSize: 14,
              fontWeight: 700,
              color: "#4A4A50",
            }}
          >
            계약해약
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default CancelPurchaseLayout;
