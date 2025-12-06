import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { User } from "./user.entity";
import { Car } from "../../car/entities/car.entity";

@Entity()
export class CompareCar {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.comparedCars, {onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(() => Car, (car) => car.comparedByUsers, {onDelete: 'CASCADE'})
    car: Car;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
