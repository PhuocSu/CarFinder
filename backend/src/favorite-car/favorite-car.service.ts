import { Injectable } from '@nestjs/common';
import { CreateFavoriteCarDto } from './dto/create-favorite-car.dto';
import { UpdateFavoriteCarDto } from './dto/update-favorite-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteCar } from './entities/favorite-car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteCarService {
  @InjectRepository(FavoriteCar)
  private favoriteCarRepository: Repository<FavoriteCar>;

  async toggle(userId: number, carId: number) {
    try {
      const exist = await this.favoriteCarRepository
        .createQueryBuilder('favorite')
        .where('favorite.user_id = :userId', { userId })
        .andWhere('favorite.car_id = :carId', { carId })
        .getOne();

      if (exist) {
        await this.favoriteCarRepository.remove(exist);
        return { status: 'removed' };
      }



      const favorite = this.favoriteCarRepository.create({
        user: { id: userId },
        car: { id: carId },
      });
      await this.favoriteCarRepository.save(favorite);
      return { status: 'added' };
    } catch (error) {
      console.log('Error adding car to favorite list:', error);
      throw new Error(error);
    }
  }

  async getFavoriteList(userId: number) {
    try {
      return await this.favoriteCarRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['car', 'car.subModel', 'car.subModel.model'],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      console.log('Error getting favorite list:', error);
      throw new Error(error);
    }
  }

  async getTopFavoriteCars(limit: number = 3) {
    try {
      return await this.favoriteCarRepository
        .createQueryBuilder('favorite')
        .leftJoinAndSelect('favorite.car', 'car')
        .leftJoinAndSelect('car.subModel', 'subModel')
        .leftJoinAndSelect('subModel.model', 'model')
        .select('car.id', 'carId')
        .addSelect('car.brandName', 'brandName')
        .addSelect('car.carRegNo', 'carRegNo')
        .addSelect('car.basePrice', 'basePrice')
        .addSelect('car.discountPercent', 'discountPercent')
        .addSelect('car.carImage', 'carImage')
        .addSelect('COUNT(favorite.id)', 'favoriteCount')
        .groupBy('car.id')
        .orderBy('favoriteCount', 'DESC')
        .limit(limit)
        .getRawMany();
    } catch (error) {
      console.log('Error getting top favorite cars:', error);
      throw new Error('Failed to get top favorite cars');
    }
  }

}
