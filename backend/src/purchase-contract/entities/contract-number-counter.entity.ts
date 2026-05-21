import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contract_number_counter")
export class ContractNumberCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "date_key", unique: true }) // ví dụ: 260519
  dateKey: string;

  @Column({ name: "last_sequence", type: "int", default: 0 }) // ví dụ: 69
  lastSequence: number;
}
