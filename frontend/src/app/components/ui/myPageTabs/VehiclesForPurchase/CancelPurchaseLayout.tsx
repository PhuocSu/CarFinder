"use client";

import { Button, Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import { Contract } from "@/types/purchaseContract";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";

type CancelPurchaseLayoutProps = {
  contract: Contract;
};

const CancelPurchaseLayout = ({ contract }: CancelPurchaseLayoutProps) => {
  const router = useRouter();

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
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography.Text
            style={{ fontSize: 16, fontWeight: 700, color: "#4A4A50" }}
          >
            {contract.car.carRegNo}
          </Typography.Text>

          <Row justify="space-between">
            <Typography.Text
              style={{ fontSize: 16, fontWeight: 400, color: "#37373E" }}
            >
              {getVehicleFullName(contract.car)}
            </Typography.Text>

            <Typography.Text
              style={{ fontSize: 15, fontWeight: 400, color: "#666670" }}
            >
              {contract.createdAt ? formatDate(contract.createdAt) : ""}
            </Typography.Text>
          </Row>
        </div>

        <Row justify="space-between">
          <Typography.Text
            style={{ fontSize: 18, fontWeight: 700, color: "#37373E" }}
          >
            {formatNumber(contract.priceAtPurchase)}원
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
            onClick={() => router.push(`/buy-my-car?id=${contract.car.id}`)}
          >
            계약 재진행
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default CancelPurchaseLayout;
