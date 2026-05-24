'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, Result, Button, Descriptions } from 'antd';
import { useRouter } from 'next/navigation';

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resultCode    = searchParams.get('resultCode');
  const orderId       = searchParams.get('orderId');
  const amount        = searchParams.get('amount');
  const transId       = searchParams.get('transId');
  const responseTime  = searchParams.get('responseTime');
  const message       = searchParams.get('message');

  const isSuccess = resultCode === '0';

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{width: '1200px', margin: '40px auto 40px'}}>
      <Card className="w-full max-w-lg" style={{width: "700px", margin: '0 auto'}}>
        <Result
          status={isSuccess ? 'success' : 'error'}
          title={isSuccess ? '결제가 성공했습니다' : '결제가 실패했습니다'}
        />

        <Descriptions column={1} bordered className="mt-4">
          <Descriptions.Item label="orderId">
            {orderId}
          </Descriptions.Item>
          <Descriptions.Item label="amount">
            {Number(amount).toLocaleString('vi-VN')}원
          </Descriptions.Item>
          {isSuccess && (
            <>
              <Descriptions.Item label="MoMo transactionId">
                {transId}
              </Descriptions.Item>
              <Descriptions.Item label="Trans time">
                {new Date(Number(responseTime)).toLocaleString('vi-VN')}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>

        <div className="mt-6 flex gap-3" style={{marginTop: '24px'}}>
          <Button
            type="primary"
            block
            style={{height: "40px", backgroundColor: "#292743", borderColor: "#292743", borderRadius: "4px"}}
            onClick={() => router.push('/')}
          >
            처음으로 
          </Button>
          {!isSuccess && (
            <Button block onClick={() => router.back()}>
              다시 시도
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}