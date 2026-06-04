"use client";

export const dynamic = "force-dynamic";

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
import { useState } from "react";

export default function PaymentViewPage() {
  const searchParams = useSearchParams();
  const contractId = Number(searchParams.get("contractId") || 0);
  return (
    <div>
      <PaymentView contractId={contractId} />
    </div>
  );
}
