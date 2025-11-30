import { BaseUpdateUserDto } from './base-update-user.dto';
import { IsNotEmpty, IsNumber, IsEmail, IsOptional } from 'class-validator';

export class UpdateIndividualDto extends BaseUpdateUserDto {
    @IsOptional()
    @IsNumber()
    hpNo?: number;

    @IsOptional()
    @IsEmail()
    email?: string;
}
