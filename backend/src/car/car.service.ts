import { Catch, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { SubModel } from 'src/sub-model/entities/sub-model.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(SubModel)
    private readonly subModelRepository: Repository<SubModel>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const subModel = await this.subModelRepository.findOne({
        where: { id: createCarDto.subModelId },
      });
      if (!subModel) {
        throw new Error('SubModel not found');
      }
      const car = this.carRepository.create({
        ...createCarDto,
      });
      return this.carRepository.save(car);
    } catch (error) {
      console.log('Error creating car:', error);
      throw new Error('Failed to create car');
    }
  }

  async findOne(id: number) {
    try {
      return await this.carRepository.findOne({
        where: { id },
        relations: ['subModel'],
      });
    } catch (error) {
      console.log('Error finding car:', error);
      throw new Error('Failed to find car');
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    try {
      const dataToUpdate: Partial<UpdateCarDto> & { id: number } = {
        //ép type phải có id => nếu không preload bị crash
        id, // id của dataUpdate
        ...updateCarDto,
      };

      if (updateCarDto.subModelId != undefined) {
        const exists = await this.subModelRepository.findOne({
          where: { id: updateCarDto.subModelId },
        });
        if (!exists) {
          throw new Error('SubModel not found');
        }
      }

      const car = await this.carRepository.preload(dataToUpdate);
      if (!car) {
        throw new Error('Car not found');
      }
      return this.carRepository.save(car);
    } catch (error) {
      console.log('Error updating car:', error);
      throw new Error('Failed to update car');
    }
  }

  async remove(id: number) {
    try {
      const car = await this.carRepository.findOne({ where: { id } });
      if (!car) {
        throw new Error('Car not found');
      }
      return await this.carRepository.remove(car);
    } catch (error) {
      console.log('Error removing car:', error);
      throw new Error('Failed to remove car');
    }
  }

  async findAll(
    search?: string,
    modelId?: number,
    subModelId?: number,
    badges?: string[],
    sortBy?: 'price' | 'year' | 'mileage',
    order: 'asc' | 'desc' = 'asc',
    page = 1,
    pageSize = 12,
  ) {
    const qb = this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.subModel', 'subModel')
      .leftJoinAndSelect('subModel.model', 'model');

    // ===== SEARCH =====
    if (search) {
      const keywords = search.toLowerCase().trim().split(/\s+/);

      keywords.forEach((word, index) => {
        qb.andWhere(
          `(
            LOWER(car.carRegNo) LIKE :kw${index}
            OR LOWER(car.brandName) LIKE :kw${index}
            OR LOWER(subModel.subModelName) LIKE :kw${index}
            OR LOWER(model.modelName) LIKE :kw${index}
          )`,
          { [`kw${index}`]: `%${word}%` },
        );
      });
    }

    // ===== FILTER BY MODEL, SUBMODEL =====
    if (modelId) {
      qb.andWhere('model.id = :modelId', { modelId });
    }

    if (subModelId) {
      qb.andWhere('subModel.id = :subModelId', { subModelId });
    }

    // ===== SORT =====
    switch (sortBy) {
      case 'price':
        qb.orderBy('car.basePrice', order.toUpperCase() as 'ASC' | 'DESC');
        break;
      case 'year':
        qb.orderBy(
          'car.manufacturerYear',
          order.toUpperCase() as 'ASC' | 'DESC',
        );
        break;
      case 'mileage':
        qb.orderBy('car.mileage', order.toUpperCase() as 'ASC' | 'DESC');
        break;
      default:
        qb.orderBy('car.createdAt', 'DESC');
    }

    // ========SEARCH BY BADGES ============
    if (badges && badges.length > 0) {
      qb.andWhere(`JSON_OVERLAPS(car.vehicleBadge, :badges)`, {
        badges: JSON.stringify(badges),
      });
    }

    // ===== PAGINATION =====
    qb.skip((page - 1) * pageSize).take(pageSize);

    const [items, count] = await qb.getManyAndCount();

    return {
      data: items,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }
}
