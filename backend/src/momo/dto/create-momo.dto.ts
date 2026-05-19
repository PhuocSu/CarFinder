import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateMomoDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @Min(1000) // MoMo yêu cầu tối thiểu 1.000đ
  amount: number;
}