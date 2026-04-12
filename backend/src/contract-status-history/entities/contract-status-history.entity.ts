import { ContractStatus, PurchaseContract } from "src/purchase-contract/entities/purchase-contract.entity";
import { User } from "src/users/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class ContractStatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  // ===== RELATIONSHIP: Contract =====
  @ManyToOne(() => PurchaseContract, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "contract_id" })
  contract: PurchaseContract;

  // ===== STATUS =====
  @Column({
    name: "previous_status",
    type: "enum",
    enum: ContractStatus,
    nullable: true, // lần đầu sẽ null
  })
  previousStatus: ContractStatus;

  @Column({
    name: "new_status",
    type: "enum",
    enum: ContractStatus,
  })
  newStatus: ContractStatus;

  // ===== WHO CHANGED =====
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "changed_by" })
  changedBy: User;

  // ===== TIME =====
  @CreateDateColumn({ name: "changed_at" })
  changedAt: Date;

  // ===== NOTE =====
  @Column({ type: "varchar", length: 255, nullable: true })
  note: string;
}