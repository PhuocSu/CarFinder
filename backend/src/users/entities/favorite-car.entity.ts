import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Car } from "../../car/entities/car.entity";

@Entity()
export class FavoriteCar {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.favoriteCars, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Car, (car) => car.favoritedByUsers, { onDelete: 'CASCADE' })
    car: Car;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
