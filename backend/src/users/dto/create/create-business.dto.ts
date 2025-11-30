import { BaseCreateUserDto } from './base-create-user.dto';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateBusinessDto extends BaseCreateUserDto {
  @IsNotEmpty()
  @IsString()
  reprsntName: string;

  @IsNotEmpty()
  corpRegNo: string;

  @IsNotEmpty()
  @IsNumber()
  corpTellNo: number;

  @IsNotEmpty()
  bnsmRegNo: string;

  @IsOptional()
  bnsmRegCert?: string;

  @IsOptional()
  corpFaxNo?: number;

  @IsEmail()
  @IsOptional()
  corpEmail?: string;

  @IsNotEmpty()
  custRep: string;

  @IsNotEmpty()
  custRepPhone: number;

  @IsOptional()
  repDepTit?: string;
}
