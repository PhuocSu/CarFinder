import { Module } from '@nestjs/common';
import { CompareCarService } from './compare-car.service';
import { CompareCarController } from './compare-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompareCar } from './entities/compare-car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompareCar])],
  controllers: [CompareCarController],
  providers: [CompareCarService],
  exports: [CompareCarService],
})
export class CompareCarModule {}
