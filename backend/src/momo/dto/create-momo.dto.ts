import { IsNumber, IsPositive, Min } from "class-validator";

export class CreateMomoDto {
  @IsNumber()
  @IsPositive()
  contractId: number; // ✅ nhận contractId thay vì orderId

  @IsNumber()
  @Min(1000)
  amount: number;
}