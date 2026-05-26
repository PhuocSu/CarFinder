import { Catch, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { SubModel } from 'src/sub-model/entities/sub-model.entity';
import { FuelType } from './enums/fuel-type.enum';

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
        relations: ['subModel', 'subModel.model', 'purchaseContracts'],
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
    badges?: string[],
    modelIds?: number[],
    subModelIds?: number[],
    yearMin?: number,
    yearMax?: number,
    priceMin?: number,
    priceMax?: number,
    mileageMin?: number,
    mileageMax?: number,
    fuelTypes?: string[],
    exColors?: string[],
    inColors?: string[],
    sortBy?: 'price' | 'year' | 'mileage',
    order: 'asc' | 'desc' = 'asc',
    page = 1,
    pageSize = 12,
  ) {
    const qb = this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.subModel', 'subModel')
      .leftJoinAndSelect('subModel.model', 'model')
      .leftJoinAndSelect('car.purchaseContracts', 'purchaseContracts');;

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
    // url should be: /car?modelIds=1,2&subModelIds=3,4,5
    if (modelIds?.length) {
      qb.andWhere('model.id IN (:...modelIds)', { modelIds });
    }
    if (subModelIds?.length) {
      qb.andWhere('subModel.id IN (:...subModelIds)', { subModelIds });
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

    // =========SEARCH BY YEAR ==============
    if (yearMin) {
      qb.andWhere('car.manufacturerYear >= :yearMin', { yearMin });
    }
    if (yearMax) {
      qb.andWhere('car.manufacturerYear <= :yearMax', { yearMax });
    }

    // ========SEARCH BY PRICE =============
    if (priceMin) {
      qb.andWhere(
        '(car.basePrice - (car.basePrice * COALESCE(car.discountPercent, 0) / 100)) >= :priceMin',
        {
          priceMin,
        },
      );
    }
    if (priceMax) {
      qb.andWhere(
        '(car.basePrice - (car.basePrice * COALESCE(car.discountPercent, 0) / 100)) <= :priceMax',
        {
          priceMax,
        },
      );
    }

    //========= SEARCH BY MILEAGE ==========
    if (mileageMin) {
      qb.andWhere('car.mileage >= :mileageMin', { mileageMin });
    }
    if (mileageMax) {
      qb.andWhere('car.mileage <= :mileageMax', { mileageMax });
    }

    //======== SEARCH BY FUEL =============
    if (fuelTypes && fuelTypes.length > 0) {
      if (!fuelTypes.includes('ALL')) {
        qb.andWhere(`car.fuelType IN (:...fuelTypes)`, {
          fuelTypes,
        });
      }
    }

    //========== SEARCH BY EXTERIOR COLOR =========
    if (exColors && exColors.length > 0) {
      qb.andWhere(`car.exteriorColor IN (:...exColors)`, {
        exColors,
      });
    }

    //========== SEARCH BY INTERIOR COLOR =========
    if (inColors && inColors.length > 0) {
      qb.andWhere(`car.interiorColor IN (:...inColors)`, {
        inColors,
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

  async getTopFavoriteCars(limit: number = 3) {
    try {
      const { entities, raw } = await this.carRepository
        .createQueryBuilder('car')
        .leftJoin('car.favoritedByUsers', 'favorite')
        .leftJoinAndSelect('car.subModel', 'subModel') // Thêm relation
        .leftJoinAndSelect('subModel.model', 'model') // Thêm relation
        .addSelect('COUNT(favorite.id)', 'favoriteCount')
        .groupBy('car.id, subModel.id, model.id')
        .orderBy('favoriteCount', 'DESC')
        .limit(limit)
        .getRawAndEntities();

      return entities.map((car, index) => ({
        ...car,
        favoriteCount: Number(raw[index].favoriteCount),
      }));
    } catch (error) {
      console.log('Error getting top favorite cars:', error);
      throw new Error('Failed to get top favorite cars');
    }
  }
}
