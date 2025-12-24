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


// export enum VehicleBadge {
//   COUPE_OPTION = '쿠페특옵션',
//   SHORT_DISTANCE = '짧은키로',
//   SINGLE_OWNER = '일인소유',
//   NO_INSURANCE_HISTORY = '보험이력없음',
//   TAX_BENEFIT = '세제혜택',
//   LIKE_NEW = '신차급',
//   CAMPER = '캠핑카',
//   BEIGE_SEATS = '베이지시트',
//   EXTENDED_WARRANTY = '보증연장',
//   NON_SMOKER = '비흡연',
//   MANUFACTURER_WARRANTY = '제조사AS',
//   GOOD_CONDITION = '양호',
//   SELLER_RECOMMENDED = '판매자추천',
//   COST_EFFECTIVE = '가성비',
//   ONLY_ONE_IN_COUNTRY = '전국유일',
//   FAMILY_CAR = '패밀리카',
//   SAFETY_FEATURES = '안전사양',
// }

// export enum FuelType {
//   ALL = '전체',
//   GASOLINE = '가솔린',
//   DIESEL = '디젤',
//   LPG = 'LPG',
//   HYBRID = '하이브리드',
//   ELECTRIC = '전기',
// }

// export enum TransmissionType {
//   AUTOMATIC = '자동변속기',
//   MANUAL = '수동변속기',
//   CVT = '무단변속기',
//   DCT = '듀얼클러치변속기',
//   SEMI_AUTOMATIC = '반자동변속기',
// }

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  carImage: string[];

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
