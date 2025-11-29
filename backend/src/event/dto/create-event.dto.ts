import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CreateEventDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    subTitle: string

    @Column()
    @IsNotEmpty()
    fileAttachment: string

    @Column()
    @IsNotEmpty()
    startDate: Date

    @Column()
    @IsNotEmpty()
    endDate: Date

    @Column()
    @IsNotEmpty()
    content: string

    @Column()
    @IsOptional()
    isTemporarySave?: boolean = false

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}