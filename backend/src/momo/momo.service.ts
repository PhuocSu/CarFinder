import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class MomoService {
  private readonly partnerCode = process.env.MOMO_PARTNER_CODE!;
  private readonly accessKey   = process.env.MOMO_ACCESS_KEY!;
  private readonly secretKey   = process.env.MOMO_SECRET_KEY!;
  private readonly endpoint    = process.env.MOMO_ENDPOINT!;

  async createPayment(orderId: string, amount: number) {
    const requestId   = this.partnerCode + new Date().getTime(); // giống MoMo gốc
    const orderInfo   = 'pay with MoMo';
    const redirectUrl = process.env.MOMO_REDIRECT_URL!;
    const ipnUrl      = process.env.MOMO_IPN_URL!;
    const requestType = 'captureWallet'; // ✅ dùng đúng như MoMo gốc
    const extraData   = '';
    const amountStr   = String(amount); // ✅ MoMo yêu cầu string

    // ✅ rawSignature đúng thứ tự alphabetical, đúng format MoMo
    const rawSignature =
      `accessKey=${this.accessKey}` +
      `&amount=${amountStr}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${this.partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;

    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: this.partnerCode,
      accessKey:   this.accessKey,
      requestId,
      amount:      amountStr, // ✅ string
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: 'en',
    };

    const { data } = await axios.post(this.endpoint, requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    return data; // { payUrl, deeplink, qrCodeUrl, ... }
  }

  verifyCallback(body: any): boolean {
    const {
      accessKey, amount, extraData, message, orderId,
      orderInfo, orderType, partnerCode, payType,
      requestId, responseTime, resultCode, transId,
      signature,
    } = body;

    // ✅ rawSignature của IPN callback đúng theo docs MoMo
    const rawSignature =
      `accessKey=${this.accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&message=${message}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&orderType=${orderType}` +
      `&partnerCode=${partnerCode}` +
      `&payType=${payType}` +
      `&requestId=${requestId}` +
      `&responseTime=${responseTime}` +
      `&resultCode=${resultCode}` +
      `&transId=${transId}`;

    const expected = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    return expected === signature;
  }
}