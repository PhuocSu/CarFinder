import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Car } from '../../car/entities/car.entity';

@Entity()
export class RecentlyViewedCar {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recentlyViewedCars, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Car, (car) => car.viewedByUsers, { onDelete: 'CASCADE' })
  car: Car;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
