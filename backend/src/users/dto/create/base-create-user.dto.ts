import { IsString, IsNotEmpty, IsDate, IsEnum, IsOptional, IsNumber, MinLength, IsDateString } from 'class-validator';
import { Role } from '../../entities/user.entity';

export class BaseCreateUserDto {
  @IsNotEmpty()
  @IsString()
  custName: string;

  @IsNotEmpty()
  @IsString()
  custId: string;

  @IsNotEmpty()
  custPw: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  custAddr?: string;

  @IsEnum(Role)
  role?: Role;
}
  


