import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MomoService } from './momo.service';
import { CreateMomoDto } from './dto/create-momo.dto';
import { PaymentsService } from 'src/payments/payments.service';

@Controller('momo')
export class MomoController {
  constructor(
    private readonly momoService: MomoService,
    private readonly paymentService: PaymentsService,
  ) {}

  // POST /momo/create
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createPayment(@Body() dto: CreateMomoDto) {
    return this.momoService.createPayment(dto.orderId, dto.amount);
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
}