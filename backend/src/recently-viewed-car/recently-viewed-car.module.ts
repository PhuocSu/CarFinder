import { Module } from '@nestjs/common';
import { RecentlyViewedCarService } from './recently-viewed-car.service';
import { RecentlyViewedCarController } from './recently-viewed-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentlyViewedCar } from './entities/recently-viewed-car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecentlyViewedCar])],
  controllers: [RecentlyViewedCarController],
  providers: [RecentlyViewedCarService],
})
export class RecentlyViewedCarModule {}
