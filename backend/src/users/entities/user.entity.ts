import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';
import { RecentlyViewedCar } from 'src/recently-viewed-car/entities/recently-viewed-car.entity';
import { FavoriteCar } from 'src/favorite-car/entities/favorite-car.entity';
import { CompareCar } from 'src/compare-car/entities/compare-car.entity';

export enum Role {
  ADMIN = 'ADMIN',
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
  AGENCY = 'AGENCY',
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

  @Column()
  isActive: boolean = true;

  @OneToMany(() => Session, (session) => session.user)
  sessions_id: Session[];

  // Individual
  @Column({ nullable: true })
  hpNo?: string;

  @Column({ nullable: true })
  email?: string;

  // Business và Agency (nhiều trường giống nhau nên gộp) => tránh dư thừa
  @Column({ nullable: true })
  reprsntName?: string;

  @Column({ nullable: true })
  corpRegNo?: string;

  @Column({ nullable: true })
  corpTellNo?: string;

  @Column({ nullable: true })
  bnsmRegNo?: string;

  @Column({ nullable: true })
  bnsmRegCert?: string;

  @Column({ nullable: true })
  corpFaxNo?: string;

  @Column({ nullable: true })
  corpEmail?: string;

  @Column({ nullable: true })
  custRep?: string;

  @Column({ nullable: true })
  custRepPhone?: string;

  @Column({ nullable: true })
  repDepTit?: string;

  @OneToMany(() => RecentlyViewedCar, (recentlyViewedCar) => recentlyViewedCar.user)
  recentlyViewedCars: RecentlyViewedCar[];

  @OneToMany(() => FavoriteCar, (favoriteCar) => favoriteCar.user)
  favoriteCars: FavoriteCar[];

  @OneToMany(() => CompareCar, (compareCar) => compareCar.user)
  comparedCars: CompareCar[];
}