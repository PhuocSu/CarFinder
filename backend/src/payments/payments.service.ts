import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import {
  PurchaseContract,
  ContractStatus,
} from 'src/purchase-contract/entities/purchase-contract.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(PurchaseContract)
    private contractRepository: Repository<PurchaseContract>,
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

    if (payment.statusPayment === PaymentStatus.SUCCESS) {
      await this.syncContractStatus(payment.contractId);
    }
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

  //Đồng bộ contractStatus + logic
  private async syncContractStatus(contractId: number): Promise<void> {
    const contract = await this.contractRepository.findOne({
      where: { id: contractId },
      relations: ['payments'],
    });

    if (!contract) throw new NotFoundException('Contract not found');

    const successfulPayments =
      contract.payments?.filter(
        (payment) => payment.statusPayment === PaymentStatus.SUCCESS,
      ) ?? [];

    const hasSuccessfulDeposit = successfulPayments.some(
      (payment) =>
        payment.paymentType === PaymentType.DEPOSIT &&
        Number(payment.amount) >= 500000,
    );

    const totalPaid = successfulPayments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0,
    );

    if (totalPaid >= Number(contract.priceAtPurchase)) {
      contract.statusContract = ContractStatus.COMPLETED;
    } else if (hasSuccessfulDeposit) {
      contract.statusContract = ContractStatus.ACTIVE;
    } else {
      contract.statusContract = ContractStatus.DRAFTED;
    }

    await this.contractRepository.save(contract);
  }

  async saveOrderId(paymentId: number, orderId: string): Promise<void> {
    await this.paymentRepository.update(paymentId, {
      orderId: orderId, // ✅ Lưu vào field orderId riêng
    });
  }
}
