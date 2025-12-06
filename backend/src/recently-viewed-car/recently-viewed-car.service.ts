import { Injectable } from '@nestjs/common';
import { CreateRecentlyViewedCarDto } from './dto/create-recently-viewed-car.dto';
import { UpdateRecentlyViewedCarDto } from './dto/update-recently-viewed-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecentlyViewedCar } from './entities/recently-viewed-car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecentlyViewedCarService {
  @InjectRepository(RecentlyViewedCar)
  private recentlyViewedCarRepository: Repository<RecentlyViewedCar>;

  async toggle(userId: number, carId: number) {
    try {
      const exist = await this.recentlyViewedCarRepository
        .createQueryBuilder('recentlyViewed')
        .where('recentlyViewed.user_id = :userId', { userId })
        .andWhere('recentlyViewed.car_id = :carId', { carId })
        .getOne();

        if(exist){
          await this.recentlyViewedCarRepository.remove(exist);
          return {status: 'removed'}
        }

        const recentlyViewed = this.recentlyViewedCarRepository.create({
          user: { id: userId },
          car: { id: carId },
        });
        await this.recentlyViewedCarRepository.save(recentlyViewed);
        return {status: 'added'}
      
    } catch (error) {
      console.log('Error adding to recently viewed list:', error);
      throw new Error(error);
    }
  }

  async getRecentlyViewedCars(userId: number) {
    try {
      return await this.recentlyViewedCarRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['car'],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      console.log('Error getting recently viewed list:',error);
      throw new Error(error);
    }
  }
}
