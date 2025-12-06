// src/user/entities/user-car-view.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Car } from '../../car/entities/car.entity';

@Entity('recently_viewed_car')
export class UserCarView {
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
