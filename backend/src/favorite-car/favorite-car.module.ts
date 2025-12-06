import { Module } from '@nestjs/common';
import { FavoriteCarService } from './favorite-car.service';
import { FavoriteCarController } from './favorite-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteCar } from './entities/favorite-car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteCar])],
  controllers: [FavoriteCarController],
  providers: [FavoriteCarService],
})
export class FavoriteCarModule {}
