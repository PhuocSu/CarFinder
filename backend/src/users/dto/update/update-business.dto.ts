import { BaseUpdateUserDto } from './base-update-user.dto';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UpdateBusinessDto extends BaseUpdateUserDto {
  @IsOptional()
  @IsString()
  reprsntName?: string;

  @IsOptional()
  @IsString()
  corpRegNo?: string;

  @IsOptional()
  @IsNumber()
  corpTellNo?: number;

  @IsOptional()
  bnsmRegNo?: string;

  @IsOptional()
  @IsString()
  bnsmRegCert?: string;

  @IsOptional()
  @IsNumber()
  corpFaxNo?: number;

  @IsOptional()
  @IsEmail()
  corpEmail?: string;

  @IsOptional()
  custRep?: string;

  @IsOptional()
  custRepPhone?: number;

  @IsOptional()
  repDepTit?: string;
}
