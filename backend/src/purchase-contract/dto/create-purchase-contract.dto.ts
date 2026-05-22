import {
  IsNumber, IsString, IsEmail, IsOptional,
  IsDateString, IsPositive, MinLength, MaxLength,
} from 'class-validator';

export class CreatePurchaseContractDto {
  // ===== RELATIONSHIPS =====
  @IsNumber()
  @IsPositive()
  carId: number;

  @IsNumber()
  @IsPositive()
  buyerId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  salepersonId?: number;

  // ===== CONTRACT INFO =====
  @IsNumber()
  @IsPositive()
  priceAtPurchase: number;

  // ===== SNAPSHOT =====
  @IsString()
  @MaxLength(100)
  buyerName: string;

  @IsEmail()
  @MaxLength(100)
  buyerEmail: string;

  @IsString()
  @MaxLength(20)
  buyerPhone: string;

  // ===== BUSINESS =====
  @IsOptional()
  @IsDateString()
  desiredDeliveryDate?: string;

  @IsOptional()
  @IsString()
  signatureDigital?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}