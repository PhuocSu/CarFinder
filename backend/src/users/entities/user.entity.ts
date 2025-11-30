import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = 'ADMIN',
    INDIVIDUAL = 'INDIVIDUAL',
    BUSINESS = 'BUSINESS',
    AGENCY = 'AGENCY'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    custName: string;

    @Column()
    custId: string;

    @Column()
    custPw: string;

    @Column()
    birthDate: Date;

    @Column()
    custAddr: string;

    @Column({ type: 'enum', enum: Role, default: Role.INDIVIDUAL })
    role: Role;

    // Individual
    @Column({ nullable: true })
    hpNo?: number;

    @Column({ nullable: true })
    email?: string;

    // Business và Agency (nhiều trường giống nhau nên gộp) => tránh dư thừa
    @Column({ nullable: true })
    reprsntName?: string;

    @Column({ nullable: true })
    corpRegNo?: string;

    @Column({ nullable: true })
    corpTellNo?: number;

    @Column({ nullable: true })
    bnsmRegNo?: string;

    @Column({ nullable: true })
    bnsmRegCert?: string;

    @Column({ nullable: true })
    corpFaxNo?: number;

    @Column({ nullable: true })
    corpEmail?: string;

    @Column({ nullable: true })
    custRep?: string;

    @Column({ nullable: true })
    custRepPhone?: number;

    @Column({ nullable: true })
    repDepTit?: string;
}
