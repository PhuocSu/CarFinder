import { Car } from "src/car/entities/car.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class FavoriteCar {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.favoriteCars, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({name: 'user_id'})
    userId: number;

    @ManyToOne(() => Car, (car) => car.favoritedByUsers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'car_id' })
    car: Car;

    @Column({name: 'car_id'})
    carId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
