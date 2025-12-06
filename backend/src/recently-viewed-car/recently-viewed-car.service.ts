import { Injectable } from '@nestjs/common';
import { CreateRecentlyViewedCarDto } from './dto/create-recently-viewed-car.dto';
import { UpdateRecentlyViewedCarDto } from './dto/update-recently-viewed-car.dto';

@Injectable()
export class RecentlyViewedCarService {
  create(createRecentlyViewedCarDto: CreateRecentlyViewedCarDto) {
    return 'This action adds a new recentlyViewedCar';
  }

  findAll() {
    return `This action returns all recentlyViewedCar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recentlyViewedCar`;
  }

  update(id: number, updateRecentlyViewedCarDto: UpdateRecentlyViewedCarDto) {
    return `This action updates a #${id} recentlyViewedCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} recentlyViewedCar`;
  }
}
