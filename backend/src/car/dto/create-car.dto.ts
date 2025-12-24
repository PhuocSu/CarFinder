import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Entity } from 'typeorm';
import { FuelType } from '../enums/fuel-type.enum';
import { TransmissionType } from '../enums/transmission-type.enum';
import { VehicleBadge } from '../enums/vehicle-badge.enum';

@Entity()
export class CreateCarDto {
  @IsArray()
  @IsUrl({}, { each: true, message: 'Each image must be a valid URL' })
  @IsNotEmpty({ message: 'Car images are required' })
  carImage: string[];

  @IsArray()
  @IsEnum(VehicleBadge, { each: true })
  @IsOptional()
  vehicleBadge: VehicleBadge[] = [];

  @IsDateString()
  @IsNotEmpty({ message: 'First registration date is required' })
  firstRegDate: Date;

  @IsEnum(FuelType, { message: 'Invalid fuel type' })
  @IsNotEmpty({ message: 'Fuel type is required' })
  fuelType: FuelType;

  @IsString()
  @IsNotEmpty({ message: 'Exterior color is required' })
  exteriorColor: string;

  @IsInt()
  @Min(1, { message: 'Seating capacity must be at least 1' })
  @IsNotEmpty({ message: 'Seating capacity is required' })
  seatingCapacity: number;

  @IsInt()
  @Min(1900, { message: 'Manufacturer year must be after 1900' })
  @Max(new Date().getFullYear() + 1, {
    message: 'Manufacturer year cannot be in the future',
  })
  @IsNotEmpty({ message: 'Manufacturer year is required' })
  manufacturerYear: number;

  @IsInt()
  @Min(0, { message: 'Mileage cannot be negative' })
  @IsNotEmpty({ message: 'Mileage is required' })
  mileage: number;

  @IsNumber()
  @Min(0.1, { message: 'Engine displacement must be positive' })
  @IsNotEmpty({ message: 'Engine displacement is required' })
  engineDisplacement: number;

  @IsString()
  @IsNotEmpty({ message: 'Interior color is required' })
  interiorColor: string;

  @IsString()
  @IsNotEmpty({ message: 'Registration number is required' })
  carRegno: string;

  @IsEnum(TransmissionType, { message: 'Invalid transmission type' })
  @IsNotEmpty({ message: 'Transmission type is required' })
  transmissionType: TransmissionType;

  @IsNumber()
  @Min(0, { message: 'Base price cannot be negative' })
  @IsNotEmpty({ message: 'Base price is required' })
  basePrice: number;

  @IsNumber()
  @Min(0, { message: 'Discount percent cannot be negative' })
  @Max(100, { message: 'Discount percent cannot exceed 100' })
  @IsOptional()
  discountPercent: number = 0;

  @IsString()
  @IsOptional()
  description: string = "";

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean = true;

  @IsInt()
  @Min(1, { message: 'SubModel ID must be a positive number' })
  @IsNotEmpty({ message: 'SubModel ID is required' })
  subModelId: number;
}
