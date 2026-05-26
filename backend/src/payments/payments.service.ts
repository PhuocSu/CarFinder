import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Payment,
  PaymentMethod,
  PaymentStatus,
  PaymentType,
} from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  // Tạo payment DEPOSIT mới với trạng thái PENDING
  async createDepositPending(
    contractId: number,
    amount: number,
    paymentType: PaymentType = PaymentType.DEPOSIT,
  ): Promise<Payment> {
    const payment = this.paymentRepository.create({
      contractId,
      amount,
      paymentType,
      paymentMethod: PaymentMethod.MOMO,
      statusPayment: PaymentStatus.PENDING,
    });
    return this.paymentRepository.save(payment);
  }

  // Tạo payment FINAL mới với trạng thái PENDING
  async createFinalPending(
    contractId: number,
    amount: number,
    paymentType: PaymentType = PaymentType.FINAL,
  ): Promise<Payment> {
    const payment = this.paymentRepository.create({
      contractId,
      amount,
      paymentType,
      paymentMethod: PaymentMethod.MOMO,
      statusPayment: PaymentStatus.PENDING,
    });
    return this.paymentRepository.save(payment);
  }

  // Cập nhật trạng thái sau khi MoMo callback về
  async updateByTransaction(data: {
    orderId: string;
    transactionRef: string;
    resultCode: number;
    paidAt: Date;
  }): Promise<void> {
    // ✅ Tìm theo orderId field
    const payment = await this.paymentRepository.findOne({
      where: { orderId: data.orderId },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    payment.statusPayment =
      data.resultCode === 0 ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
    payment.transactionRef = data.transactionRef; // ✅ Lưu MoMo transId
    payment.paidAt = data.paidAt;

    await this.paymentRepository.save(payment);
  }

  async findByContractId(contractId: number): Promise<Payment[]> {
    const payments = await this.paymentRepository.find({
      where: { contractId },
      relations: [
        'contract',
        'contract.car',
        'contract.car.subModel',
        'contract.car.subModel.model',
      ],
      order: { createdAt: 'DESC' },
    });
    if (!payments.length) throw new NotFoundException('Payment not found');
    return payments;
  }


  //Sử dụng cho retry Deposit
  async findByOrderId(orderId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { orderId },
      relations: ['contract'],
    });

    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async createRetryPaymentByOrderId(orderId: string): Promise<Payment> {
    const failedPayment = await this.findByOrderId(orderId);

    if (failedPayment.statusPayment !== PaymentStatus.FAILED) {
      throw new BadRequestException('Only failed payments can be retried');
    }

    return this.createDepositPending(
      failedPayment.contractId,
      Number(failedPayment.amount),
      failedPayment.paymentType,
    );
  }

  async saveOrderId(paymentId: number, orderId: string): Promise<void> {
    await this.paymentRepository.update(paymentId, {
      orderId: orderId, // ✅ Lưu vào field orderId riêng
    });
  }
}
