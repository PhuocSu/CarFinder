import { IsString, IsNotEmpty, IsDate, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  custName: string;

  @IsNotEmpty()
  @IsString()
  custId: string;

  @IsNotEmpty()
  @IsString()
  custPw: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsString()
  custAddr?: string;

  // role là optional, mặc định là CUSTOMER
  @IsOptional()
  @IsEnum(Role)
  role?: Role = Role.USER;
}

export class CreateIndividualCustomerDto extends CreateUserDto {
  @IsOptional()
  @IsNumber()
  hpNo?: number;

  @IsOptional()
  @IsString()
  email?: string;
}   

export class CreateBusinessCustomerDto extends CreateUserDto {
    @IsNotEmpty()
    @IsString()
    reprsntName: string;
  
    @IsNotEmpty()
    @IsString()
    corpRegNo: string;
  
    @IsNotEmpty()
    @IsNumber()
    corpTellNo: number;
  
    @IsNotEmpty()
    @IsString()
    bnsmRegNo: string;
  
    @IsOptional()
    @IsString()
    bnsmRegCert?: string;
  
    @IsOptional()
    @IsNumber()
    corpFaxNo?: number;
  
    @IsOptional()
    @IsString()
    corpEmail?: string;
  
    @IsNotEmpty()
    @IsString()
    custRep: string;
  
    @IsNotEmpty()
    @IsNumber()
    custRepPhone: number;
  
    @IsOptional()
    @IsString()
    repDepTit?: string;
}

export class CreateAgencyCustomerDto extends CreateUserDto {
    @IsNotEmpty()
    @IsString()
    reprsntName: string;
  
    @IsNotEmpty()
    @IsString()
    bnsmRegNo: string;
  
    @IsNotEmpty()
    @IsNumber()
    corpTellNo: number;
  
    @IsOptional()
    @IsString()
    bnsmRegCert?: string;
  
    @IsOptional()
    @IsNumber()
    corpFaxNo?: number;
  
    @IsOptional()
    @IsString()
    corpEmail?: string;
  
    @IsNotEmpty()
    @IsString()
    custRep: string;
  
    @IsNotEmpty()
    @IsNumber()
    custRepPhone: number;
  
    @IsOptional()
    @IsString()
    repDepTit?: string;
}


