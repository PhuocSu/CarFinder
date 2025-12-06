import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Car } from "../../car/entities/car.entity";

@Entity()
export class CompareCar {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.comparedCars, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({name: 'user_id', nullable: true})
    userId: number;

    @ManyToOne(() => Car, (car) => car.comparedByUsers, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'car_id'})
    car: Car;

    @Column({name: 'car_id', nullable: true})
    carId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
