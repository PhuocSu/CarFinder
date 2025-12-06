import { PartialType } from '@nestjs/swagger';
import { CreateCompareCarDto } from './create-compare-car.dto';

export class UpdateCompareCarDto extends PartialType(CreateCompareCarDto) {}
