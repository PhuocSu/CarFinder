import { IsString, IsOptional, IsEnum, MinLength, IsDateString } from 'class-validator';
import { Role } from '../../entities/user.entity';

export class BaseUpdateUserDto {
  @IsOptional()
  @IsString()
  custName?: string;

  @IsOptional()
  @IsString()
  custId?: string;

  @IsOptional()
  @MinLength(6)
  custPw?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  custAddr?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
  


