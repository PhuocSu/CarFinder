import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum Category {
    ALL = '전체', // Tất cả
    VEHICLE_AND_CONTRACT_PROCEDURE = '차량 및 계약 절차 관련', // Thủ tục xe và hợp đồng
    CONTRACT_CONDITIONS = '계약 조건 관련', // Điều kiện hợp đồng
    PAYMENT_AND_COSTS = '결제/비용 관련', // Thanh toán/Chi phí
    VEHICLE_ACCEPTANCE = '인수관련', // Tiếp nhận xe
    OTHERS = '기타' // Khác
}

@Entity()
export class Faq {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'enum',
        enum: Category,
        default: Category.ALL,
    })
    category: Category;

    @Column({ nullable: true }) // Cho phép null nếu không bắt buộc
    fileAttachment: string;

    @Column('varchar', { length: 500 })
    content: string;

    @Column({ default: false })
    isTemporarySave: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
