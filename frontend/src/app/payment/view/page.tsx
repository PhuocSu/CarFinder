"use client";

import { Suspense, useState } from "react";
import PaymentView from "@/app/components/ui/payment/paymentView";
import { DownOutlined } from "@ant-design/icons";
import {
  Card,
  Table,
  Row,
  Col,
  Divider,
  Empty,
  Flex,
  Typography,
  Image,
} from "antd";
import { useSearchParams } from "next/navigation";

const PaymentViewContent = () => {
  const searchParams = useSearchParams();
  const contractId = Number(searchParams.get("contractId") || 0);
  return (
    <div>
      <PaymentView contractId={contractId} />
    </div>
  );
};

export default function PaymentViewPage() {
  return (
    <Suspense fallback={null}>
      <PaymentViewContent />
    </Suspense>
  );
}
