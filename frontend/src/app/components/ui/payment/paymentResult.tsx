"use client";

import { useConfirmMomoMutation } from "@/app/api/payments/momo/useConfirmMomoMutation";
import { useRetryMomoPaymentMutation } from "@/app/api/payments/momo/useRetryMomoPaymentMutation";
import { Button, Card, Descriptions, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confirming, setConfirming] = useState(true);
  const retryPaymentMutation = useRetryMomoPaymentMutation();

  const resultCode = searchParams.get("resultCode");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const transId = searchParams.get("transId");
  const responseTime = searchParams.get("responseTime");
  const message = searchParams.get("message");

  const isSuccess = resultCode === "0";

  useEffect(() => {
    if (resultCode && orderId && transId && responseTime) {
      useConfirmMomoMutation({
        orderId,
        transId,
        responseTime,
        resultCode,
      })
        .catch((err) => console.error("Confirm payment error:", err))
        .finally(() => setConfirming(false));
      return;
    }

    setConfirming(false);
  }, [resultCode, orderId, transId, responseTime]);

  const handleRetryPayment = () => {
    if (!orderId || retryPaymentMutation.isPending) return;

    retryPaymentMutation.mutate({ orderId });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ width: "1200px", margin: "40px auto 40px" }}
    >
      <Card
        className="w-full max-w-lg"
        style={{ width: "700px", margin: "0 auto" }}
      >
        <Result
          status={isSuccess ? "success" : "error"}
          title={isSuccess ? "결제가 성공했습니다" : "결제가 실패했습니다"}
          subTitle={message || undefined}
        />

        <Descriptions column={1} bordered className="mt-4">
          <Descriptions.Item label="orderId">{orderId}</Descriptions.Item>
          <Descriptions.Item label="amount">
            {Number(amount || 0).toLocaleString("ko-KR")}원
          </Descriptions.Item>
          {isSuccess && (
            <>
              <Descriptions.Item label="MoMo transactionId">
                {transId}
              </Descriptions.Item>
              <Descriptions.Item label="Trans time">
                {responseTime
                  ? new Date(Number(responseTime)).toLocaleString("ko-KR")
                  : "-"}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>

        <div className="mt-6 flex gap-3" style={{ marginTop: "24px" }}>
          <Button
            type="primary"
            block
            disabled={confirming}
            style={{
              height: "40px",
              backgroundColor: "#292743",
              borderColor: "#292743",
              borderRadius: "4px",
            }}
            onClick={() => router.push("/")}
          >
            {confirming ? "확인하고 있습니다..." : "처음으로"}
          </Button>
          {!isSuccess && (
            <Button
              block
              loading={retryPaymentMutation.isPending}
              disabled={!orderId}
              onClick={handleRetryPayment}
            >
              다시 시도
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentResult;
