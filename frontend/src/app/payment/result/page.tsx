'use client';

import { Suspense } from "react";
import PaymentResult from '@/app/components/ui/payment/paymentResult';

export default function PaymentResultPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <PaymentResult />
      </Suspense>
    </div>
  );
}