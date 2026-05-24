import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MomoService } from './momo.service';
import { CreateMomoDto } from './dto/create-momo.dto';
import { PaymentsService } from 'src/payments/payments.service';
import { PaymentType } from 'src/payments/entities/payment.entity';

@Controller('momo')
export class MomoController {
  constructor(
    private readonly momoService: MomoService,
    private readonly paymentService: PaymentsService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createPayment(@Body() dto: CreateMomoDto) {
    // ✅ Bước 1: Tạo payment PENDING trong DB
    const payment = await this.paymentService.createPending(
      dto.contractId,
      dto.amount,
      PaymentType.DEPOSIT,
    );

    // ✅ Thêm timestamp để tránh trùng orderId với MoMo
    const orderId = `${payment.id}-${Date.now()}-${Math.random().toString(36).substring(2,8)}`;

    // ✅ Lưu orderId này vào payment để sau callback tìm lại được
    await this.paymentService.saveOrderId(payment.id, orderId);

    // ✅ Bước 2: Gửi orderId unique sang MoMo
    return this.momoService.createPayment(
      orderId, // dùng orderId unique đã tạo
      dto.amount,
    );
  }

  // POST /momo/callback  ← MoMo IPN gọi vào đây
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async handleIpn(@Body() body: any) {
    const valid = this.momoService.verifyCallback(body);
    if (!valid) throw new BadRequestException('Invalid signature');

    // ✅ Cập nhật DB đầy đủ
    await this.paymentService.updateByTransaction({
      orderId: body.orderId,
      transactionRef: body.transId,
      resultCode: body.resultCode,
      paidAt: new Date(body.responseTime),
    });

    return { message: 'ok' }; // ✅ MoMo yêu cầu trả về 200 + { message: 'ok' }
  }

  // POST /momo/confirm ← Frontend gọi sau khi nhận redirect từ MoMo
  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirmPayment(@Body() body: {
    orderId: string;
    transId: string;
    responseTime: string;
    resultCode: string;
  }) {
    await this.paymentService.updateByTransaction({
      orderId: body.orderId,
      transactionRef: body.transId,
      resultCode: Number(body.resultCode),
      paidAt: new Date(Number(body.responseTime)),
    });

    return { message: 'Payment confirmed' };
  }
}
