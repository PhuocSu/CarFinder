import {
  Body,
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateMomoDto } from './dto/create-momo.dto';
import { MomoService } from './momo.service';
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
    const payment = await this.paymentService.createPending(
      dto.contractId,
      dto.amount,
      PaymentType.DEPOSIT,
    );

    const orderId = `${payment.id}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    await this.paymentService.saveOrderId(payment.id, orderId);

    return this.momoService.createPayment(orderId, dto.amount);
  }

  @Post('retry')
  @HttpCode(HttpStatus.OK)
  async retryPayment(@Body() body: { orderId: string }) {
    const payment = await this.paymentService.createRetryPaymentByOrderId(
      body.orderId,
    );

    const orderId = `${payment.id}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    await this.paymentService.saveOrderId(payment.id, orderId);

    return this.momoService.createPayment(orderId, Number(payment.amount));
  }

  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async handleIpn(@Body() body: any) {
    const valid = this.momoService.verifyCallback(body);
    if (!valid) throw new BadRequestException('Invalid signature');

    await this.paymentService.updateByTransaction({
      orderId: body.orderId,
      transactionRef: body.transId,
      resultCode: body.resultCode,
      paidAt: new Date(body.responseTime),
    });

    return { message: 'ok' };
  }

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
