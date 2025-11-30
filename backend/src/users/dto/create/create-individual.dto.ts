import { BaseCreateUserDto } from './base-create-user.dto';
import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsNumber } from 'class-validator';

export class CreateIndividualDto extends BaseCreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  hpNo: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
