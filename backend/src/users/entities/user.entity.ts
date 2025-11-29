import { ChildEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

@Entity()
@TableInheritance({column: {
    type:'varchar', 
    name:'type' //typeORm tự động điền
}})
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

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;
}

@ChildEntity()
export class IndividualCustomer extends User {
  @Column()
  hpNo: number;

  @Column()
  email: string;
}

@ChildEntity()
export class BusinessCustomer extends User {
  @Column()
  reprsntName: string;

  @Column()
  corpRegNo: string;

  @Column()
  corpTellNo: number;

  @Column()
  bnsmRegNo: string;

  @Column()
  bnsmRegCert: string;

  @Column()
  corpFaxNo: number;

  @Column()
  corpEmail: string;

  @Column()
  custRep: string;

  @Column()
  custRepPhone: number;

  @Column()
  repDepTit: string;
}

@ChildEntity()
export class AgencyCustomer extends User {
  @Column()
  reprsntName: string;

  @Column()
  bnsmRegNo: string;

  @Column()
  corpTellNo: number;

  @Column()
  bnsmRegCert: string;

  @Column()
  corpFaxNo: number;

  @Column()
  corpEmail: string;

  @Column()
  custRep: string;

  @Column()
  custRepPhone: number;

  @Column()
  repDepTit: string;
}


