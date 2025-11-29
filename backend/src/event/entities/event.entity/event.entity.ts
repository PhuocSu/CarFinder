import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subTitle: string

    @Column()
    fileAttachment: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    content: string

    @Column()
    isTemporarySave?: boolean = false

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
