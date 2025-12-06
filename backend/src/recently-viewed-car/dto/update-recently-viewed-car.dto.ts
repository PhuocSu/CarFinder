import { PartialType } from '@nestjs/swagger';
import { CreateRecentlyViewedCarDto } from './create-recently-viewed-car.dto';

export class UpdateRecentlyViewedCarDto extends PartialType(CreateRecentlyViewedCarDto) {}
