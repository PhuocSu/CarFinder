import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteCarDto } from './create-favorite-car.dto';

export class UpdateFavoriteCarDto extends PartialType(CreateFavoriteCarDto) {}
