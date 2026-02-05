import { Injectable } from '@nestjs/common';
import { CreateRecentlyViewedCarDto } from './dto/create-recently-viewed-car.dto';
import { UpdateRecentlyViewedCarDto } from './dto/update-recently-viewed-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecentlyViewedCar } from './entities/recently-viewed-car.entity';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RecentlyViewedCarService {
  @InjectRepository(RecentlyViewedCar)
  private recentlyViewedCarRepository: Repository<RecentlyViewedCar>;

  async trackView(userId: number, carId: number) {
    try {
      const exist = await this.recentlyViewedCarRepository
        .createQueryBuilder('recentlyViewed')
        .where('recentlyViewed.user_id = :userId', { userId })
        .andWhere('recentlyViewed.car_id = :carId', { carId })
        .getOne();

      if (exist) {
        // update time
        exist.updatedAt = new Date();
        await this.recentlyViewedCarRepository.save(exist);
        return { status: 'updated' };
      }

      const recentlyViewed = this.recentlyViewedCarRepository.create({
        user: { id: userId },
        car: { id: carId },
      });

      await this.recentlyViewedCarRepository.save(recentlyViewed);
      return { status: 'added' };
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
        relations: ['car', 'car.subModel', 'car.subModel.model'],
        order: {
          updatedAt: 'DESC',
        },
      });
    } catch (error) {
      console.log('Error getting recently viewed list:', error);
      throw new Error(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanOldRecentlyViewed() {
    console.log('[CRON] Running at:', new Date().toISOString());

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 00:00 hôm nay

    await this.recentlyViewedCarRepository.delete({
      createdAt: LessThan(today),
    });

    console.log('[CRON] Cleaned old recently viewed cars');
  }
}
