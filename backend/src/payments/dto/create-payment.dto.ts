import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  @Min(1, { message: 'Contract ID must be greater than 0' })
  @IsNotEmpty({ message: 'Contract ID is required' })
  contractId: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Amount must be a valid decimal number' },
  )
  @Min(0, { message: 'Amount cannot be negative' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @IsEnum(PaymentMethod, { message: 'Invalid payment method' })
  @IsNotEmpty({ message: 'Payment method is required' })
  paymentMethod: PaymentMethod;

  @IsEnum(PaymentStatus, { message: 'Invalid payment status' })
  @IsOptional()
  statusPayment?: PaymentStatus;

  @IsString()
  @MaxLength(100, {
    message: 'Transaction reference must not exceed 100 characters',
  })
  @IsOptional()
  transactionRef?: string;

  @IsDateString({}, { message: 'Paid at must be a valid date' })
  @IsOptional()
  paidAt?: Date;
}
