import { PurchaseContract } from 'src/purchase-contract/entities/purchase-contract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
  MOMO = 'MOMO',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum PaymentType {
  DEPOSIT = 'DEPOSIT', // tiền cọc
  FINAL   = 'FINAL',   // thanh toán còn lại
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PurchaseContract, (contract) => contract.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contract_id' })
  contract: PurchaseContract;

  @Column({ name: 'contract_id' })
  contractId: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  amount: number;

  @Column({
    name: 'payment_type',
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.DEPOSIT,
  })
  paymentType: PaymentType;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({
    name: 'status_payment',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  statusPayment: PaymentStatus;

  @Column({ name: 'order_id', length: 100, nullable: true })
  orderId: string;

  @Column({ name: 'transaction_ref', length: 100, nullable: true })
  transactionRef: string;

  @Column({ name: 'paid_at', type: 'date', nullable: true })
  paidAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
