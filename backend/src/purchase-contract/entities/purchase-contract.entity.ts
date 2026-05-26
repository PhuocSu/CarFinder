import { Car } from 'src/car/entities/car.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

export enum ContractStatus {
  DRAFTED = 'DRAFTED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class PurchaseContract {
  @PrimaryGeneratedColumn()
  id: number;

  // ===== RELATIONSHIPS =====

  @ManyToOne(() => Car, { nullable: false }) // không cho xóa car khi có contract liên kết
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => User, { nullable: false }) // không cho xóa user khi có contract liên kết
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'saleperson_id' })
  saleperson: User;

  @OneToMany(() => Payment, (payment) => payment.contract)
  payments: Payment[];

  // ===== CONTRACT INFO =====

  @Column({ name: 'contract_number', unique: true })
  contractNumber: string;

  @Column({
    name: 'price_at_purchase',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  priceAtPurchase: number;  

  // ===== SNAPSHOT (IMPORTANT) =====

  @Column({ name: 'buyer_name', length: 100 })
  buyerName: string;

  @Column({ name: 'buyer_email', length: 100 })
  buyerEmail: string;

  @Column({ name: 'buyer_phone', length: 20 })
  buyerPhone: string;

  // ===== BUSINESS =====

  @Column({ name: 'desired_delivery_date', type: 'date', nullable: true })
  desiredDeliveryDate: Date;

  @Column({ name: 'signature_digital', type: 'text', nullable: true })
  signatureDigital: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({
    name: 'status_contract',
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.DRAFTED,
  })
  statusContract: ContractStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
