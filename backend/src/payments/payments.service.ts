import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentMethod, PaymentStatus } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

   // Tạo payment mới với trạng thái PENDING
  async createPending(contractId: number, amount: number): Promise<Payment> {
    const payment = this.paymentRepository.create({
      contractId,
      amount,
      paymentMethod: PaymentMethod.MOMO,
      statusPayment: PaymentStatus.PENDING,
    });
    return this.paymentRepository.save(payment);
  }

  // Cập nhật trạng thái sau khi MoMo callback về
  async updateByTransaction(data: {
    orderId: string;       // chính là payment.id
    transactionRef: string; // transId từ MoMo
    resultCode: number;    // 0 = success
    paidAt: Date;
  }): Promise<void> {
    const payment = await this.paymentRepository.findOne({
      where: { id: Number(data.orderId) },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    payment.statusPayment = data.resultCode === 0
      ? PaymentStatus.SUCCESS
      : PaymentStatus.FAILED;
    payment.transactionRef = data.transactionRef;
    payment.paidAt = data.paidAt;

    await this.paymentRepository.save(payment);
  }
}
