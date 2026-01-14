import { CompareCar } from 'src/compare-car/entities/compare-car.entity';
import { FavoriteCar } from 'src/favorite-car/entities/favorite-car.entity';
import { RecentlyViewedCar } from 'src/recently-viewed-car/entities/recently-viewed-car.entity';
import { SubModel } from 'src/sub-model/entities/sub-model.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VehicleBadge } from '../enums/vehicle-badge.enum';
import { FuelType } from '../enums/fuel-type.enum';
import { TransmissionType } from '../enums/transmission-type.enum';


@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  carImage: string[];

  @Column({ nullable: true })
  modelName: string;

  @Column({ nullable: true })
  subModelName: string;

  @Column()
  brandName: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  vehicleBadge: VehicleBadge[];

  @Column()
  firstRegDate: Date;

  @Column()
  fuelType: FuelType;

  @Column()
  exteriorColor: string;

  @Column()
  seatingCapacity: number;

  @Column()
  manufacturerYear: number;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Mileage in kilometers',
    unsigned: true, // Số km không thể âm
  })
  mileage: number;

  @Column()
  engineDisplacement: number;

  @Column()
  interiorColor: string;

  @Index() // Thêm index cho tìm kiếm nhanh
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
    comment: 'Car registration number',
  })
  carRegno: string;

  @Column()
  transmissionType: TransmissionType;

  @Column('int')
  basePrice: number;

  @Column('float')
  discountPercent: number;

  @Column()
  description: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Whether the car is currently available for sale',
  })
  isAvailable: boolean; //check available in web?

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //========================================
  @ManyToOne(() => SubModel, (subModel) => subModel.cars)
  @JoinColumn({ name: 'sub_model_id' })
  subModel: SubModel;

  @Column({ name: 'sub_model_id' })
  subModelId: number;

  //========================================
  @OneToMany(() => RecentlyViewedCar, (view) => view.car)
  viewedByUsers: RecentlyViewedCar[];

  @OneToMany(() => FavoriteCar, (favoriteCar) => favoriteCar.car)
  favoritedByUsers: FavoriteCar[];

  @OneToMany(() => CompareCar, (compareCar) => compareCar.car)
  comparedByUsers: CompareCar[];
}
