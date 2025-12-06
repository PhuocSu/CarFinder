import { Injectable } from '@nestjs/common';
import { CreateCompareCarDto } from './dto/create-compare-car.dto';
import { UpdateCompareCarDto } from './dto/update-compare-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompareCar } from './entities/compare-car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompareCarService {
  @InjectRepository(CompareCar)
  private compareCarRepository: Repository<CompareCar>;

  async toggle(userId: number, carId: number) {
    try {
      const exist = await this.compareCarRepository
        .createQueryBuilder('compare')
        .where('compare.user_id = :userId', { userId })
        .andWhere('compare.car_id = :carId', { carId })
        .getOne();

      //nếu đã tồn tại thì xóa
      if (exist) {
        await this.compareCarRepository.remove(exist);
        return { status: 'removed' };
      }
      //nếu chưa tồn tại thì thêm
      const compare = this.compareCarRepository.create({
        user: { id: userId },
        car: { id: carId },
      });
      await this.compareCarRepository.save(compare);
      return { status: 'added' };
    } catch (error) {
      console.log('Error adding car to compare list:', error);
      throw error;
    }
  }

  async getCompareList(userId: number) {
    return this.compareCarRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['car'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
