import { Car } from "src/car/entities/car.entity";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
