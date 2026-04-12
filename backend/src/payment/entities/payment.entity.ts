import { PurchaseContract } from "src/purchase-contract/entities/purchase-contract.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

export enum PaymentMethod {
  MOMO = "MOMO",
  BANK_TRANSFER = "BANK_TRANSFER",
  CREDIT_CARD = "CREDIT_CARD",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  // ===== RELATIONSHIP =====
  @ManyToOne(() => PurchaseContract, {
    nullable: false,
    onDelete: "CASCADE", // ✅ đúng
  })
  @JoinColumn({ name: "contract_id" })
  contract: PurchaseContract;

  // ===== PAYMENT INFO =====
  @Column({
    type: "decimal",
    precision: 12,
    scale: 2,
  })
  amount: number;

  @Column({
    name: "payment_method",
    type: "enum",
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({
    name: "status_payment",
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  statusPayment: PaymentStatus;

  @Column({ name: "transaction_ref", nullable: true })
  transactionRef: string;

  @Column({ name: "paid_at", type: "datetime", nullable: true })
  paidAt: Date;
}