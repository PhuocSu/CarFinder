import { BaseCreateUserDto } from './base-create-user.dto';
import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsNumber } from 'class-validator';

export class CreateIndividualDto extends BaseCreateUserDto {
  @IsNotEmpty()
  hpNo: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
