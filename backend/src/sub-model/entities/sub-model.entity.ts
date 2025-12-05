import { Car } from "src/car/entities/car.entity";
import { Model } from "src/model/entities/model.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SubModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subModelName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //===================================================
    @ManyToOne(() => Model, (model) => model.subModels)
    @JoinColumn({ name: 'model_id' })
    model: Model;

    @Column({ name: 'model_id' })
    modelId: number;

    //===================================================
    @OneToMany(() => Car, (car) => car.subModel)
    cars: Car[];

}
