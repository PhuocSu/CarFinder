import { BaseCreateUserDto } from './base-create-user.dto';
import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsNumber } from 'class-validator';
import { Role } from '../../entities/user.entity';

export class CreateIndividualDto extends BaseCreateUserDto {
  @IsNotEmpty()
  hpNo: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  // Override role to default to INDIVIDUAL
  role?: Role = Role.INDIVIDUAL;
}
